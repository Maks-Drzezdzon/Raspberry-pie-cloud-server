//Using Hive broker - dashboard available at http://www.hivemq.com/demos/websocket-client/
//Uses the Paho MQTT JS client library - http://www.eclipse.org/paho/files/jsdoc/index.html to send and receive messages using a web browser
//Example code available at https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js

document.getElementById("connect").addEventListener("click", connectToBroker);
document.getElementById("disconnect").addEventListener("click", DC);
document.getElementById("publish").addEventListener("click", publish);


// Create a client instance
 client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "web_" + parseInt(Math.random() * 100, 10));

// set callback handlers
//client.onConnected = onConnected;
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
 
var connectOptions = {onSuccess: onConnectCallback};

function connectToBroker(){
    // connect the client
    client.connect(connectOptions);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function DC(){
		client.disconnect();
		client.unsubscribe("/maks_iot");
	}
	
function publish(){
		message = new Paho.MQTT.Message("hey maks");
		message.destinationName = "/maks_iot";
		client.send(message);
	}

// called when the client connect request is successful
function onConnectCallback() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("connected");
  /*var topic = document.getElementById("topicToPublishTo").value;
  var message2 = document.getElementById("messageToPublishTo").value;
  
  client.subscribe(topic)
  message.destinationName = topic;
  message = new Paho.MQTT.Message(message2);
  client.send(message);
  */
  
  client.subscribe("/maks_iot")
  message.destinationName = "/maks_iot";
  message = new Paho.MQTT.Message("hey maks");
  client.send(message);
  
  //client.publish(topic , message, 0, false); //publish a message to the broker
}


function onMessageArrived(message) {
  document.getElementById("send_message").innerHTML = message.payloadString;
  console.log("onMessageArrived:"+message.payloadString);
}
