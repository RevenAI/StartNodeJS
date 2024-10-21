"use strict";

var express = require('express');

var app = express();

var path = require('path');

var cors = require('cors');

var corsOptions = require('./config/CorsOptions');

var _require = require('./middleware/logEvents'),
    logger = _require.logger;

var errorHandler = require('./middleware/errorHandler');

var verifyJWT = require('./middleware/verifyJWT');

var cookieParser = require('cookie-parser');

var PORT = process.env.PORT || 3001;
app.use(logger); // Cross Origin Resource Sharing

app.use(cors(corsOptions)); // built-in middleware to handle urlencoded data. In other words, form data. Content type; ‘content-type: application/x-www-form-urlencoded’

app.use(express.urlencoded({
  extended: false
})); // built-in middleware for json 

app.use(express.json());
app.use(cookieParser); //serve static files

app.use('/', express["static"](path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/api/products'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees')); //Adding more checks to 404 routes

app.all('*', function (req, res) {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({
      "error": "404 Not Found"
    });
  } else {
    res.type('txt').send("404 Not Found");
  }
});
app.use(errorHandler);
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
}); // Usefull Snippets
//first 404 method. Using app.get

/* app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})
 */

/* 
//using app.all: app.all catches 404 for all HTTP methods. Note: We don't use / in app.all
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})
 */