"use strict";

var express = require('express');

var router = express.Router();

var employeesController = require('../../Controllers/EmployeesController'); // Route for /employees


router.route('/').get(employeesController.getAllEmployees).post(employeesController.createNewEmployee).put(employeesController.updateEmployee)["delete"](employeesController.deleteEmployee); // Route for /:id

router.route('/:id').get(employeesController.getEmployee);
module.exports = router;