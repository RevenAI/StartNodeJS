const data = {};
data.employees = require('../model/employees.json');

// Get all employees
const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

// Get a single employee by ID
const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ "message": "Employee not found" });
    }
}

// Create a new employee
const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees.length + 1,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role,
        RegisteredDate: new Date().toISOString()
    };
    data.employees.push(newEmployee);
    res.status(201).json(newEmployee);
}

// Update an existing employee
const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (employee) {
        employee.name = req.body.name || employee.name;
        employee.email = req.body.email || employee.email;
        employee.age = req.body.age || employee.age;
        employee.role = req.body.role || employee.role;
        employee.RegisteredDate = new Date().toISOString(); // Update the date
        res.json(employee);
    } else {
        res.status(404).json({ "message": "Employee not found" });
    }
}

// Delete an employee
const deleteEmployee = (req, res) => {
    const index = data.employees.findIndex(emp => emp.id === parseInt(req.body.id));
    if (index !== -1) {
        const deletedEmployee = data.employees.splice(index, 1);
        res.json(deletedEmployee);
    } else {
        res.status(404).json({ "message": "Employee not found" });
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
