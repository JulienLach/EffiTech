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

    static async getAllEmployees() {
        const result = await pool.query('SELECT * FROM employees');
        return result.rows;
    }

    static async getEmployeeById(idEmployee) {
        const query = 'SELECT * FROM employees WHERE idEmployee = $1';
        const values = [idEmployee];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async createEmployee(firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality) {
        const query = 'INSERT INTO employees (firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality];
        await pool.query(query, values);
    }
}

module.exports = Employee;