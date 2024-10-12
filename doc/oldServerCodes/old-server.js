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
}

const server = http.createServer((req, res) =>
{
   console.log(req.url, req.method);

const extension = path.extname(req.url);
let contentType;

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

let filePath = '';

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
}

//make the .html extension not required in the browser
if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

const fileExists = fs.existsSync(filePath);

if (fileExists) {
    //call the function to serve the file
serveFile(filePath, contentType, res);
    //serve the file
    } else {
    //404 or 301 redirect
    switch (path.parse(filePath).base) {
    case 'old-page.html':
    req.writeHead(301, { 'Location': '/new-page.html'});
    req.end();
    break;
    case 'www-page.html':
    res.writeHead(301, { Location: '/' });
    res.end();
    break;
    default:
    serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
    }
}

});

server.listen(PORT, () => 
{
   console.log(`Server running on port ${PORT}`);
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
