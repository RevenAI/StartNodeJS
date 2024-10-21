"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var usersDB = {
  users: require('../model/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
};

var express = require('express');

var jwt = require('jsonwebtoken');

require('dotenv').config();

var fsPromises = require('fs').promises;

var path = require('path');

var bcrypt = require('bcrypt');

var handleLogin = function handleLogin(req, res) {
  var _req$body, user, pwd, foundUser, match, accessToken, refreshToken, otherUsers, currentUser;

  return regeneratorRuntime.async(function handleLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user = _req$body.user, pwd = _req$body.pwd;

          if (!(!user || !pwd)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            'message': 'Username and password are required.'
          }));

        case 3:
          foundUser = usersDB.users.find(function (person) {
            return person.username === user;
          }); //if (!foundUser) return res.sendStatus(401); //Unauthorized 

          if (foundUser) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            "error": "User not found."
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(pwd, foundUser.password));

        case 8:
          match = _context.sent;

          if (!match) {
            _context.next = 21;
            break;
          }

          // create JWTs
          accessToken = jwt.sign({
            "username": foundUser.username
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
          });
          refreshToken = jwt.sign({
            "username": foundUser.username
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
          }); // Saving refreshToken with current user

          otherUsers = usersDB.users.filter(function (person) {
            return person.username !== foundUser.username;
          });
          currentUser = _objectSpread({}, foundUser, {
            refreshToken: refreshToken
          });
          usersDB.setUsers([].concat(_toConsumableArray(otherUsers), [currentUser]));
          _context.next = 17;
          return regeneratorRuntime.awrap(fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users)));

        case 17:
          res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
          });
          res.json({
            accessToken: accessToken
          }); //res.json({ 'success': `User ${user} is logged in!` });

          _context.next = 22;
          break;

        case 21:
          //res.sendStatus(401);
          res.status(401).json({
            "error": "Wrong credentials submitted."
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  handleLogin: handleLogin
};