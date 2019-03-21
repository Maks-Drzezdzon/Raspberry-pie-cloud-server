//MQTT broker dashboard available at http://www.hivemq.com/demos/websocket-client/
var mqtt    = require('mqtt');
var topicToSubscribeTo="iot_topic/LED"
var topicToPublishTo="iot_topic/accel"
var mqttClient  = mqtt.connect('mqtt://broker.mqttdashboard.com');

console.log("Starting MQTT Client");

mqttClient.on('connect', connectCallback); //when a 'connect' event is received call the connectCallback listener function
          
function connectCallback() {
  console.log("connected to MQTT broker");
  // subscribe to a topic
  //mqttClient.subscribe(topicToSubscribeTo, subscribeCallback); //can use a separate callback or just listen for the event as is done on line 25 below!  
  mqttClient.publish(topicToPublishTo, 'sensor value', publishCallback);
	
  mqttClient.subscribe(topicToSubscribeTo);
  console.log("subscribed to messages on topic " + topicToSubscribeTo);	
  // publish a message to the topic specified above

}

//function subscribeCallback() {
    mqttClient.on('message', messageEventHandler); //when a 'message' event is received call the messageEventHandler listener function
 //}

function messageEventHandler(topic, message, packet) { 
    console.log("Received '" + message + "' on '" + topic + "'");
}

function publishCallback(error) {     
   	if (error) {
		console.log("error publishing data");
	} else {	 
        console.log("Message is published to topic " + topicToPublishTo);
        //mqttClient.end(); // Close the connection when published
    }
}