const express = require('express');
const router = express.Router();
const employeesController = require('../../Controllers/EmployeesController');

// Route for /employees
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// Route for /:id
router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
