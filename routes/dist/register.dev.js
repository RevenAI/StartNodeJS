"use strict";

var express = require('express');

var router = express.Router();

var registerController = require('../Controllers/RegisterController');

router.post('/', registerController.handleNewUser);
module.exports = router;