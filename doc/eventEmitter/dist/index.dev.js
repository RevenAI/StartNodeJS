"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var logEvents = require('./logEvents');

var EventEmitter = require('events');

var _require = require('./systemInfo'),
    displaySystemInfo = _require.displaySystemInfo; // Create a class that extends EventEmitter


var MyEmitter =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(MyEmitter, _EventEmitter);

  function MyEmitter() {
    _classCallCheck(this, MyEmitter);

    return _possibleConstructorReturn(this, _getPrototypeOf(MyEmitter).apply(this, arguments));
  }

  return MyEmitter;
}(EventEmitter);

; // Instantiate an object of MyEmitter class

var myEmitter = new MyEmitter(); // Register a listener for the 'log' event

myEmitter.on('log', function (message) {
  logEvents(message); // Call logEvents function with the 'message' passed in
}); // Emit the 'log' event after 2 seconds

setTimeout(function () {
  var systemInfoMessage = displaySystemInfo(); //console.log(systemInfoMessage);

  myEmitter.emit('log',
  /* 'Log event emitted.' */
  systemInfoMessage);
}, 2000);