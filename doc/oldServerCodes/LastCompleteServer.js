

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
const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const logEvents = require('./logEvents');
const EventEmitter = require('events');
const { displaySystemInfo } = require('./systemInfo');

class Emitter extends EventEmitter {};
const emitter = new Emitter();
emitter.on('log', (message, fileName) => { 
    logEvents(message, fileName);
});

const PORT = process.env.PORT || 8080; // Use 8080 for testing

// Function to handle serving files
const serveFile = async (filePath, contentType, response) => {
    try {
        const encoding = contentType.includes('text') ? 'utf8' : ''; // Only 'utf8' for text-based files
        const rawData = await fsPromises.readFile(filePath, encoding);
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 400 : 200, 
            { 'Content-Type': contentType });
        response.end(
        contentType === 'application/json' ? JSON.stringify(data) : data    
        );
    } catch (err) {
        console.error('File serving error:', err);
        response.statusCode = 500;
        emitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.end('Server Error');
    }
}

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}, Method: ${req.method}`);
    emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

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

    // Log file path being served
    console.log(`Serving file from path: ${filePath}`);

    // Make the .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);
    console.log(`File exists: ${fileExists}`);

    if (fileExists) {
        // Serve the file
        serveFile(filePath, contentType, res);
    } else {
        // Handle 404 or redirects
        console.log('File not found, serving 404.html');
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

// Capture server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});