"use strict";

var jwt = require('jsonwebtoken');

require('dotenv').config();

var verifyJWT = function verifyJWT(req, res, next) {
  var authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer token

  var token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) return res.sendStatus(403); //invalid token

    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;