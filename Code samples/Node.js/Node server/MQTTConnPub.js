

//MQTT broker dashboard available at http://www.hivemq.com/demos/websocket-client/
var mqtt = require('mqtt');
//ref to hold mqtt module
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com');
//require mqtt module .connect to link
//requires [url], options
var topicToPublishTo ="iot_topic/accel2"

console.log("Starting Client now");

//lilsten to 'connect' event
client.on('connect', connectCallback); //when a 'connect' event is received call the connectCallback listener function
client.on('message', messageCallback);

          
function connectCallback() {
	/*if(error){
		//add error handling here
		console.log("error connecting data");
	}else{*/
		console.log("connected to MQTT broker");
		
		//publish a message to the topic specified above
		//accel values will be replaced with bluetooth values later on
		//mqtt.publish (topic,message,[options],[callback])
		
		//client.publish(topicToPublishTo, 'maks accel values', publishCallback);
		client.subscribe('iot_topic/accel2');
	/*}*/
}

function messageCallback(topic,message){
			console.log(message.toString());
			//console.log("error publishing message");		
	}

function publishCallback(error) {     
   	if (error) {
		console.log("error publishing data");
	} else {	 
        console.log("Message is published");
        //client.end(); // Close the connection when published
    }
}

