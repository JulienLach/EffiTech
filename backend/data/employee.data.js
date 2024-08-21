const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Employee {
    constructor(idEmployee, firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality) {
        this.idEmployee = idEmployee;
        this.firstname = firstname;
        this.lastname = lastname;
        this.job = job;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.isAdmin = isAdmin;
        this.password = password;
        this.speciality = speciality;
    }

    static getAllEmployees(callback) {
        const query = 'SELECT * FROM employees';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const employees = result.rows.map(row => new Employee(row.idEmployee, row.firstname, row.lastname, row.job, row.phoneNumber, row.email, row.isAdmin, row.password, row.speciality));
            callback(null, employees);
        });
    }

    static getEmployeeById(idEmployee, callback) {
        const query = 'SELECT * FROM employees WHERE idEmployee = $1';
        const values = [idEmployee];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            let employee = new Employee(row.idEmployee, row.firstname, row.lastname, row.job, row.phoneNumber, row.email, row.isAdmin, row.password, row.speciality);
            callback(null, employee);
        });
    }

    static createEmployee(firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality, callback) {
        const query = 'INSERT INTO employees (firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality];
        pool.query(query, values, (error, newEmployee) => {
            if (error) {
                return callback(error, null);
            }
            const row = newEmployee.rows[0];
            newEmployee = new Employee(row.idEmployee, row.firstname, row.lastname, row.job, row.phoneNumber, row.email, row.isAdmin, row.password, row.speciality);
            callback(null, newEmployee);
        });
    }
    
    static updateEmployee(idEmployee, firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality, callback) {
        const query = 'UPDATE employees SET firstname = $1, lastname = $2, job = $3, phoneNumber = $4, email = $5, isAdmin = $6, password = $7, speciality = $8 WHERE idEmployee = $9';
        const values = [firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality, idEmployee];
        pool.query(query, values, (error, updateEmployee) => {
            if (error) {
                return callback(error, null);
            }
            const row = updateEmployee.rows[0];
            updateEmployee = new Employee(row.idEmployee, row.firstname, row.lastname, row.job, row.phoneNumber, row.email, row.isAdmin, row.password, row.speciality);
            callback(null, updateEmployee);
        });
    }
}

module.exports = Employee;