"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* 
//SIMPLE TEST
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
}); */
//GPT SECOND
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
var PORT = process.env.PORT || 8080; // Use 8080 for testing
// Function to handle serving files

var serveFile = function serveFile(filePath, contentType, response) {
  var encoding, data;
  return regeneratorRuntime.async(function serveFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          encoding = contentType.includes('text') ? 'utf8' : ''; // Only 'utf8' for text-based files

          _context.next = 4;
          return regeneratorRuntime.awrap(fsPromises.readFile(filePath, encoding));

        case 4:
          data = _context.sent;
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.end(data);
          _context.next = 14;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('File serving error:', _context.t0);
          response.statusCode = 500;
          response.end('Server Error');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var server = http.createServer(function (req, res) {
  console.log("Request: ".concat(req.url, ", Method: ").concat(req.method));
  var extension = path.extname(req.url);
  var contentType; // Determine content type based on file extension

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

  var filePath = ''; // Handling paths for different content types

  if (contentType === 'text/html') {
    if (req.url === '/') {
      filePath = path.join(__dirname, 'views', 'index.html');
    } else if (req.url.slice(-1) === '/') {
      filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else {
      filePath = path.join(__dirname, 'views', req.url);
    }
  } else {
    filePath = path.join(__dirname, req.url);
  } // Log file path being served


  console.log("Serving file from path: ".concat(filePath)); // Make the .html extension not required in the browser

  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
  var fileExists = fs.existsSync(filePath);
  console.log("File exists: ".concat(fileExists));

  if (fileExists) {
    // Serve the file
    serveFile(filePath, contentType, res);
  } else {
    // Handle 404 or redirects
    console.log('File not found, serving 404.html');

    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, {
          'Location': '/new-page.html'
        });
        res.end();
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
}); // Capture server errors

server.on('error', function (err) {
  console.error('Server error:', err);
}); //GPT FIRST

/* 
 const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path'); 
const logEvents = require('./logEvents');
const EventEmitter = require('events');
const { displaySystemInfo } = require('./systemInfo');

class Emitter extends EventEmitter {};
const emitter = new Emitter();

const PORT = process.env.PORT || 3500;

// Function to handle serving files
const serveFile = async (filePath, contentType, response) => {
    try {
        const encoding = contentType.includes('text') ? 'utf8' : ''; // Only 'utf8' for text-based files
        const data = await fsPromises.readFile(filePath, encoding);
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end('Server Error');
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);
    let contentType;

    // Determine content type based on file extension
    switch (extension) {
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.json': contentType = 'application/json'; break;
        case '.jpg':
        case '.jpeg': contentType = 'image/jpeg'; break;
        case '.png': contentType = 'image/png'; break;
        case '.gif': contentType = 'image/gif'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
        case '.ico': contentType = 'image/x-icon'; break;
        case '.pdf': contentType = 'application/pdf'; break;
        case '.txt': contentType = 'text/plain'; break;
        case '.xml': contentType = 'application/xml'; break;
        case '.wav': contentType = 'audio/wav'; break;
        case '.mp3': contentType = 'audio/mpeg'; break;
        case '.mp4': contentType = 'video/mp4'; break;
        case '.woff': contentType = 'font/woff'; break;
        case '.woff2': contentType = 'font/woff2'; break;
        default: contentType = 'text/html'; break;
    }

    let filePath = '';

    // Handling paths for different content types
    if (contentType === 'text/html') {
        if (req.url === '/') {
            filePath = path.join(__dirname, 'views', 'index.html');
        } else if (req.url.slice(-1) === '/') {
            filePath = path.join(__dirname, 'views', req.url, 'index.html');
        } else {
            filePath = path.join(__dirname, 'views', req.url);
        }
    } else {
        filePath = path.join(__dirname, req.url);
    }

    // Make the .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // Serve the file
        serveFile(filePath, contentType, res);
    } else {
        // Handle 404 or redirects
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { Location: '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 */