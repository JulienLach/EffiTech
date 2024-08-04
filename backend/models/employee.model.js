const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Employee {
    constructor(id_employee, firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality) {
        this.id_employee = id_employee;
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

    // Suite des méthodes
}

module.exports = Employee;