"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var usersDB = {
  users: require('../model/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
};

var fsPromises = require('fs').promises;

var path = require('path');

var bcrypt = require('bcrypt');

var handleNewUser = function handleNewUser(req, res) {
  var _req$body, user, pwd, duplicate, hashedPwd, newUser;

  return regeneratorRuntime.async(function handleNewUser$(_context) {
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
          // check for duplicate usernames in the db
          duplicate = usersDB.users.find(function (person) {
            return person.username === user;
          });

          if (!duplicate) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.sendStatus(409));

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(pwd, 10));

        case 9:
          hashedPwd = _context.sent;
          //store the new user
          newUser = {
            "username": user,
            "password": hashedPwd
          };
          usersDB.setUsers([].concat(_toConsumableArray(usersDB.users), [newUser]));
          _context.next = 14;
          return regeneratorRuntime.awrap(fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users)));

        case 14:
          console.log(usersDB.users);
          res.status(201).json({
            'success': "New user ".concat(user, " created!")
          });
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](6);
          res.status(500).json({
            'message': _context.t0.message
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 18]]);
};

module.exports = {
  handleNewUser: handleNewUser
};