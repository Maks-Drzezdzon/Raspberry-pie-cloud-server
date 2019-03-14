var noble = require('noble'); //load the BLE noble module c.f. https://github.com/noble/noble 
var peripheralOfInterestUUID = f935f5de9da1'; //change the value of xyz to match uuid of peripheral of interest e.g. d6619d652945
var serviceOfInterestUuid = ['a012']; //change this value to match the service of interest

// allow duplicate peripheral to be returned (default false) on discovery event
var allowDuplicates = false; 

noble.on('stateChange', stateChangeEventHandler); //when a stateChange event occurs call the event handler callback function, discoverDeviceEventHandler

function stateChangeEventHandler(state) { //event handler callback function
  if (state === 'poweredOn') {
    console.log("starting scanning for devices with service uuid : " + serviceOfInterestUuid);  
    //noble.startScanning();
	noble.startScanning(serviceOfInterestUuid, allowDuplicates); //scan for devices containing the service of interest
  } else {
    console.log("stopping scanning");  
    noble.stopScanning();
	process.exit(0);
  }
}

noble.on('discover', discoverDeviceEventHandler); //when a discover event occurs call the event handler callback function, discoverDeviceEventHandler
console.log("up and running");

function discoverDeviceEventHandler(peripheral) { //event handler callback function 
	console.log('Found peripheral device with :');
	console.log('    uuid: ' + peripheral.uuid);
	console.log('    local name: ' + peripheral.advertisement.localName);
	console.log('    advertising service(s) with uuid(s) ' + peripheral.advertisement.serviceUuids);
	//console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
    if (peripheral.uuid == peripheralOfInterestUUID){ 
        peripheralGlobal = peripheral;  //set the peripheralGlobal variable equal to the callback peripheral parameter value
		noble.stopScanning(); //stop scanning before connecting to one of the peripherals
		peripheral.connect(connectCallback); //call the connect function and when it returns the callback function connectCallback will be executed
	}; //end if 
}

function connectCallback(error) { //this will be executed when the connect request returns
	if (error) {
		console.log("error connecting to peripheral");
	} else {		
		console.log('connected to peripheral device: ' + peripheralGlobal.uuid  + "   " + peripheralGlobal.advertisement.localName);
		peripheralGlobal.discoverServices([], discoverServicesCallback); //call the discoverServices function and when it returns the callback function discoverServicesCallback will be executed
	}
}

function discoverServicesCallback(error, services) { //this will be executed when the discoverServices request returns
	if (error) {
		console.log("error discovering services");
	} else {
		console.log("device advertises the following services");			
		for (var i in services) {
			console.log('  ' + i + ' uuid: ' + services[i].uuid);
		}
		for (var i in services) {
			/*if(services[i].uuid == serviceOfInterestUuid) {
				services[i].discoverCharacteristics(null, discoverCharsCallback2);
			}*/
			if (serviceOfInterestUuid.includes(services[i].uuid)) {
				services[i].discoverCharacteristics(null, discoverCharsCallback);
			}
		}        
		//pick one service to interrogate
		//var deviceInformationService = services[serviceOfInterest];
		//deviceInformationService.discoverCharacteristics(null, discoverCharsCallback2); //call the discoverCharacteristics function and when it returns the callback function discoverCharsCallback will be executed
	}
}

function discoverCharsCallback(error, characteristics) { //this will be executed when the discoverCharacteristics request returns
	if (error) {
		console.log("error discovering characteristics");
	} else {
		console.log('service ' + serviceOfInterestUuid + ' has the following characteristics:  ');
		for (var i in characteristics) {
			console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
            characteristics[i].read(readDataCallback);
        }
        //pick one characteristic to read the value of 
        //var sensorLevelData = characteristics[characteristicOfInterest];
        //sensorLevelData.read(readDataCallback); //call the read function and when it returns the callback function readDataCallback will be executedcallback function writeDataCallback will be executed
		} //end for loop
}

function readDataCallback(error, data) { //this will be executed when the read request returns
	if (error) {
		console.log("error reading data");
	} else {	
		console.log("characteristic value is : " + data.toString('hex'));
		//peripheralGlobal.disconnect(disconnectCallback);
	}
}

function disconnectCallback(error){ //this will be executed when the disconnect request returns
	if (error) {
		console.log("error disconnecting");
	} else {
		console.log("Disconnected BLE peripheral");
		//noble.startScanning();
		noble.startScanning(serviceOfInterestUuid, allowDuplicates); //restart scanning for devices with the services of interest
		console.log("Re-started scanning");
	}
}

