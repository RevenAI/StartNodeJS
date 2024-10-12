 
const logEvents = require('./logEvents');
const EventEmitter = require('events');
const { displaySystemInfo } = require('./systemInfo');

// Create a class that extends EventEmitter
class MyEmitter extends EventEmitter {};

// Instantiate an object of MyEmitter class
const myEmitter = new MyEmitter();

// Register a listener for the 'log' event
myEmitter.on('log', (message) => { 
    logEvents(message) // Call logEvents function with the 'message' passed in
});

// Emit the 'log' event after 2 seconds
setTimeout(() => {
    const systemInfoMessage = displaySystemInfo();
//console.log(systemInfoMessage);
    myEmitter.emit('log', /* 'Log event emitted.' */ systemInfoMessage);
}, 2000);

