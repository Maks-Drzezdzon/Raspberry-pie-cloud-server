
//Using Hive broker - dashboard available at http://www.hivemq.com/demos/websocket-client/
//Uses the Paho MQTT JS client library - http://www.eclipse.org/paho/files/jsdoc/index.html to send and receive messages using a web browser
//Example code available at https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js

document.getElementById("connect").addEventListener("click", connectToBroker);
document.getElementById("disconnect").addEventListener("click", disconnectFromBroker);
document.getElementById("publish").addEventListener("click", publishTest);

// Create a client instance
 client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "web_" + parseInt(Math.random() * 100, 10));

// set callback handlers
//client.onConnected = onConnected;
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var connectOptions = {
    onSuccess: onConnectCallback //other options available to set
};

function connectToBroker(){
    // connect the client
    client.connect(connectOptions);
}

function disconnectFromBroker(){
		client.disconnect();
		var topicTest = document.getElementById("topicToPublishTo").value;
		client.unsubscribe(topicTest);
	}
function publishTest(){
		var topicTest = document.getElementById("topicToPublishTo").value;
		var messageTest = document.getElementById("messageToPublishTo").value;
  		client.publish(topicTest,messageTest, 0, false); //publish a message to the broker
	}

// called when the client connect request is successful
function onConnectCallback() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("connected");
  var topicTest = document.getElementById("topicToPublishTo").value;
  client.subscribe(topicTest);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  document.getElementById("message_sent").innerHTML = message.payloadString;
  console.log("onMessageArrived:"+ message.payloadString);
}

