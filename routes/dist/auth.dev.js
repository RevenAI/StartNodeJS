"use strict";

var express = require('express');

var router = express.Router();

var authController = require('../Controllers/AuthController');

router.post('/', authController.handleLogin);
module.exports = router;