"use strict";

// Cross Origin Resource Sharing
var whitelist = ['https://www.google.com', 'http://127.0.0.1:3001'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1 || !_origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
module.exports = corsOptions;