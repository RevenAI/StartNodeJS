"use strict";

// logEvents that log the systemFile in the dir

/* const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const logDir = path.join(__dirname, '../../../NodeJS/Documentation/NpmLesson/log');
const logFile = path.join(logDir, 'eventlog.txt');

const logEvents = async (message) => {
    const dateTime = format(new Date(), 'ddMMyyyy\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\n\n${message}\n\n`;
    console.log(logItem);
    
try {
    if (!fs.existsSync(logDir)) {
        await fsPromise.mkdir(logDir, {recursive: true });
    }
    await fsPromise.appendFile(logFile, logItem);
} catch (err) {
    console.error(err);
}

}

module.exports = logEvents; */
// logEvents that works with the main server logging
var fs = require('fs');

var fsPromise = require('fs').promises;

var path = require('path');

var _require = require('date-fns'),
    format = _require.format;

var _require2 = require('uuid'),
    uuid = _require2.v4;

var logDir = path.join(__dirname, '../../../NodeJS/Documentation/NpmLesson/log');

var logEvents = function logEvents(message, logName) {
  var dateTime, logItem, logFile;
  return regeneratorRuntime.async(function logEvents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dateTime = format(new Date(), 'ddMMyyyy\tHH:mm:ss');
          logItem = "".concat(dateTime, "\t").concat(uuid(), "\n\n").concat(message, "\n\n");
          console.log(logItem);
          logFile = path.join(logDir, logName);
          _context.prev = 4;

          if (fs.existsSync(logDir)) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(fsPromise.mkdir(logDir, {
            recursive: true
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(fsPromise.appendFile(logFile, logItem));

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](4);
          console.error(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 12]]);
};

module.exports = logEvents;