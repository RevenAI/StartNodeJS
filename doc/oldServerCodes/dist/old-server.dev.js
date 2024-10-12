"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var http = require('http');

var fs = require('fs');

var fsPromises = require('fs').promises;

var path = require('path');

var logEvents = require('./logEvents');

var EventEmitter = require('events');

var _require = require('./systemInfo'),
    displaySystemInfo = _require.displaySystemInfo;

var Emitter =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter() {
    _classCallCheck(this, Emitter);

    return _possibleConstructorReturn(this, _getPrototypeOf(Emitter).apply(this, arguments));
  }

  return Emitter;
}(EventEmitter);

;
var emitter = new Emitter();
var PORT = process.env.PORT || 3500; //function to handle servefile

var serveFile = function serveFile(filePath, contentType, response) {
  var data;
  return regeneratorRuntime.async(function serveFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fsPromises.readFile(filePath, 'utf8'));

        case 3:
          data = _context.sent;
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.end(data);
          _context.next = 13;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          response.statusCode = 500;
          response.end();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var server = http.createServer(function (req, res) {
  console.log(req.url, req.method);
  var extension = path.extname(req.url);
  var contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;

    case '.js':
      contentType = 'text/javascript';
      break;

    case '.json':
      contentType = 'application/json';
      break;

    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;

    case '.png':
      contentType = 'image/png';
      break;

    case '.gif':
      contentType = 'image/gif';
      break;

    case '.svg':
      contentType = 'image/svg+xml';
      break;

    case '.ico':
      contentType = 'image/x-icon';
      break;

    case '.pdf':
      contentType = 'application/pdf';
      break;

    case '.txt':
      contentType = 'text/plain';
      break;

    case '.xml':
      contentType = 'application/xml';
      break;

    case '.wav':
      contentType = 'audio/wav';
      break;

    case '.mp3':
      contentType = 'audio/mpeg';
      break;

    case '.mp4':
      contentType = 'video/mp4';
      break;

    case '.woff':
      contentType = 'font/woff';
      break;

    case '.woff2':
      contentType = 'font/woff2';
      break;

    default:
      contentType = 'text/html';
      break;
  }

  var filePath = '';

  if (contentType === 'text/html') {
    if (req.url === '/') {
      // If it's the home page (root URL), serve 'index.html'
      filePath = path.join(__dirname, 'views', 'index.html');
    } else if (req.url.slice(-1) === '/') {
      // If the URL ends with '/', serve the folder's 'index.html'
      filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else {
      // Otherwise, try serving the specific HTML file directly
      filePath = path.join(__dirname, 'views', req.url);
    }
  } else {
    // For other content types (CSS, JS, images, etc.), serve the file directly
    filePath = path.join(__dirname, req.url);
  } //make the .html extension not required in the browser


  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
  var fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //call the function to serve the file
    serveFile(filePath, contentType, res); //serve the file
  } else {
    //404 or 301 redirect
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        req.writeHead(301, {
          'Location': '/new-page.html'
        });
        req.end();
        break;

      case 'www-page.html':
        res.writeHead(301, {
          Location: '/'
        });
        res.end();
        break;

      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});
server.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});
/* 
// ORIGINAL let filePath Code
let filePath =

contentType === 'text/html' && req.url === '/'
? path.join(__dirname, 'views', 'index.html')
: contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html') : contentType === 'text/html'
? path.join(__dirname, 'views', req.url) : path.join(__dirname, req.url);

//make the .html extension not required in the browser
if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

const fileExist = fs.existsSync(filePath);

if (fileExists) {
//serve the file
} else {
//404 04 301 redirect
console.log(
path.parse(filePath););
}




//function to handle servefile
const serveFile = async (filePath, contentType, response) => {
try {
const data = await fsPromises.readFile(filePath, 'utf8');
response.writeHead(200, { 'Content-Type': contentType });
response.end(data);
} catch (err) {
console.log(err);
response.statusCode = 500;
response.end();
}
*/
//PATH DEFINITION ONE

/* 
let path;

if (req.url === '/' || req.url === 'index.html') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    path = path.join(__dirname, 'views', 'index.html');
    fs.readFile(path, 'utf8', (err, data) => {
    res.end(data);
});
}
*/

/* 
// //PATH DEFINITION TWO
switch (req.url) {
case '/': 
 res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    path = path.join(__dirname, 'views', 'index.html');
    fs.readFile(path, 'utf8', (err, data) => {
    res.end(data);
});
break;
}
*/

/*
emitter.on('log', (message) => { 
    logEvents(message) 
});
 
setTimeout(() => {
    const systemInfoMessage = displaySystemInfo();

    emitter.emit('log', systemInfoMessage);
}, 2000);
 */