var noble = require('noble'); //load the BLE noble module c.f. https://github.com/noble/noble

var peripheralOfInterestUUID = 'c3c29996610a'; //change the value of xyz to match uuid of peripheral of interest e.g. d6619d652945
var serviceOfInterest = 2; //0 by default, needs to be set to array index that matches the service of interest 
var characteristicOfInterest = 0; //0 by default, needs to be set to array index that matches the characteristic of interest

//global variable - shared between functions
var peripheralGlobal;
var actuatorData;

noble.on('stateChange', stateChangeEventHandler); //when a stateChange event occurs call the event handler callback function, discoverDeviceEventHandler

function stateChangeEventHandler(state) { //event handler callback function
  if (state === 'poweredOn') {
    console.log("starting scanning");  
    noble.startScanning();
  } else {
    console.log("stopping scanning");  
    noble.stopScanning();
  }
}

noble.on('discover', discoverDeviceEventHandler); //when a discover event occurs call the event handler callback function, discoverDeviceEventHandler
console.log("up and running");

function discoverDeviceEventHandler(peripheral) { //event handler callback function 
	console.log('Found device with local name: ' + peripheral.advertisement.localName);
	//console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
	console.log("peripheral uuid : " + peripheral.uuid);
	//if (peripheral.advertisement.localName == "BBC micro:bit [gugiv]"){
    if (peripheral.uuid == peripheralOfInterestUUID){ 
        peripheralGlobal = peripheral;  //set the peripheralGlobal variable equal to the callback peripheral parameter value
		console.log(peripheral.uuid);
		peripheral.connect(connectCallback); //call the connect function and when it returns the callback function connectCallback will be executed
	}; //end if 
}

function connectCallback(error) { //this will be executed when the connect request returns
	if (error) {
		console.log("error connecting to peripheral");
	} else {		
		console.log('connected to peripheral: ' + peripheralGlobal.uuid  + "   " + peripheralGlobal.advertisement.localName);
		peripheralGlobal.discoverServices([], discoverServicesCallback); //call the discoverServices function and when it returns the callback function discoverServicesCallback will be executed
	}
}

function discoverServicesCallback(error, services) { //this will be executed when the discoverServices request returns
	if (error) {
		console.log("error discovering services");
	} else {
		console.log("The device contains the following services");			
		for (var i in services) {
			console.log('  ' + i + ' uuid: ' + services[i].uuid);
		}
        //pick one service to interrogate
		var deviceInformationService = services[serviceOfInterest];
		deviceInformationService.discoverCharacteristics(null, discoverCharsCallback); //call the discoverCharacteristics function and when it returns the callback function discoverCharsCallback will be executed
	}
}

function discoverCharsCallback(error, characteristics) { //this will be executed when the discoverCharacteristics request returns
	if (error) {
		console.log("error discovering characteristics");
	} else {
		console.log('discovered the following characteristics associated with the service:');
		for (var i in characteristics) {
			console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
        }
        //pick one characteristic to write to
        actuatorData = characteristics[characteristicOfInterest];
        
        characteristics[i].read(readDataCallback);

        //actuatorData.write(new Buffer([1]), false, writeDataCallback); //call the write function and when it returns the callback function writeDataCallback will be executed
		} //end for loop
}

function readDataCallback(error, data) { //this will be executed when the read request returns
	if (error) {
		console.log("error reading data");
	} else {	
        console.log("Current actuator state is : " + data.toString('hex'));
        if (data.toString('hex') == '00') { //if LED is off, turn it on or blining
            actuatorData.write(new Buffer([1]), false, writeDataCallback);
	        console.log("Turned actuator on");	
            //call the write function and when it returns the callback function writeDataCallback will be executed
        } else { //if LED is on, turn it off
            actuatorData.write(new Buffer([0]), false, writeDataCallback);
			console.log("Turned actuator off");
        }
		//peripheralGlobal.disconnect(disconnectCallback);
	}
}
function writeDataCallback(error, data) { //this will be executed when the write request returns
	if (error) {
		console.log("error writing data");
	} else {	
		//peripheralGlobal.disconnect(disconnectCallback);
	}
}

function disconnectCallback(error){ //this will be executed when the disconnect request returns
	if (error) {
		console.log("error disconnecting");
	} else {
		console.log("Disconnecting and stopping scanning");
	}
}