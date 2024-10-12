
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
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const logDir = path.join(__dirname, '../../../NodeJS/Documentation/NpmLesson/log');

const logEvents = async (message, logName) => {
    const dateTime = format(new Date(), 'ddMMyyyy\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\n\n${message}\n\n`;
    console.log(logItem);

    const logFile = path.join(logDir, logName);
    
try {
    if (!fs.existsSync(logDir)) {
        await fsPromise.mkdir(logDir, {recursive: true });
    }
    await fsPromise.appendFile(logFile, logItem);
} catch (err) {
    console.error(err);
}

}

module.exports = logEvents; 