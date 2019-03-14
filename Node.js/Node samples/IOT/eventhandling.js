// import events module
//ref var events
var events = require('events');
//new eventEmitter on ref var events
var eventEmitter = new events.EventEmitter();

var btEventHandler = function () {
  //print out message
  console.log('discovered a Bluetooth device in the room!');
}
//call on function for eventEmitter
//to register an event listener on the function btEventHandler
eventEmitter.on('BTdiscover', btEventHandler);

//call emit function for eventEmitter
//used to trigger the event
eventEmitter.emit('BTdiscover');


var eventEmitter2 = new events.EventEmitter();

//created EventHandler
var handler = function(){
  console.log('error handler code');
}

//assigning the event handler to an event
eventEmitter2.on('error' , handler);

//fireing the event that will trigger the handler event assigned to it
eventEmitter2.emit('error');
