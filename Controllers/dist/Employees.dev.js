"use strict";

var data = {};
data.employees = require('../model/employees.json'); // Get all employees

var getAllEmployees = function getAllEmployees(req, res) {
  res.json(data.employees);
}; // Get a single employee by ID


var getEmployee = function getEmployee(req, res) {
  var employee = data.employees.find(function (emp) {
    return emp.id === parseInt(req.params.id);
  });

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({
      "message": "Employee not found"
    });
  }
}; // Create a new employee


var createNewEmployee = function createNewEmployee(req, res) {
  var newEmployee = {
    id: data.employees.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    role: req.body.role,
    RegisteredDate: new Date().toISOString()
  };
  data.employees.push(newEmployee);
  res.status(201).json(newEmployee);
}; // Update an existing employee


var updateEmployee = function updateEmployee(req, res) {
  var employee = data.employees.find(function (emp) {
    return emp.id === parseInt(req.params.id);
  });

  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.age = req.body.age || employee.age;
    employee.role = req.body.role || employee.role;
    employee.RegisteredDate = new Date().toISOString(); // Update the date

    res.json(employee);
  } else {
    res.status(404).json({
      "message": "Employee not found"
    });
  }
}; // Delete an employee


var deleteEmployee = function deleteEmployee(req, res) {
  var index = data.employees.findIndex(function (emp) {
    return emp.id === parseInt(req.body.id);
  });

  if (index !== -1) {
    var deletedEmployee = data.employees.splice(index, 1);
    res.json(deletedEmployee);
  } else {
    res.status(404).json({
      "message": "Employee not found"
    });
  }
};

module.exports = {
  getAllEmployees: getAllEmployees,
  createNewEmployee: createNewEmployee,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee,
  getEmployee: getEmployee
};