const pool = require("../config/db.config"); // Importer la configuration de la base de données
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class Employee {
    constructor(
        idEmployee,
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin,
        password,
        speciality
    ) {
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
        const query = "SELECT * FROM employees";
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const employees = result.rows.map(function (row) {
                return new Employee(
                    row.id_employee,
                    row.firstname,
                    row.lastname,
                    row.job,
                    row.phone_number,
                    row.email,
                    row.is_admin,
                    row.password,
                    row.speciality
                );
            });
            callback(null, employees);
        });
    }

    static getEmployeeById(idEmployee, callback) {
        const query = "SELECT * FROM employees WHERE id_employee = $1";
        const values = [idEmployee];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            let employee = new Employee(
                row.id_employee,
                row.firstname,
                row.lastname,
                row.job,
                row.phone_number,
                row.email,
                row.is_admin,
                row.password,
                row.speciality
            );
            callback(null, employee);
        });
    }

    static createEmployee(
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin,
        password,
        speciality,
        callback
    ) {
        const hash = crypto.createHash("sha512");
        hash.update(password);
        const hashedPassword = hash.digest("hex");

        const query = `
            INSERT INTO employees (firstname, lastname, job, phone_number, email, is_admin, password, speciality) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING id_employee, firstname, lastname, job, phone_number, email, is_admin, password, speciality
        `;
        const values = [
            firstname,
            lastname,
            job,
            phoneNumber,
            email,
            isAdmin,
            hashedPassword,
            speciality,
        ];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const newEmployee = new Employee(
                row.id_employee,
                row.firstname,
                row.lastname,
                row.job,
                row.phone_number,
                row.email,
                row.is_admin,
                row.password,
                row.speciality
            );

            // Générer un token JWT
            const token = jwt.sign(
                { id: newEmployee.idEmployee, email: newEmployee.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            );

            // Retourner le nouvel employé et le token
            callback(null, newEmployee);
        });
    }

    static updateEmployee(
        idEmployee,
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin,
        password,
        speciality,
        callback
    ) {
        const query =
            "UPDATE employees SET firstname = $1, lastname = $2, job = $3, phone_number = $4, email = $5, is_admin = $6, password = $7, speciality = $8 WHERE id_employee = $9 RETURNING *";
        const values = [
            firstname,
            lastname,
            job,
            phoneNumber,
            email,
            isAdmin,
            password,
            speciality,
            idEmployee,
        ];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const updatedEmployee = new Employee(
                row.id_employee,
                row.firstname,
                row.lastname,
                row.job,
                row.phone_number,
                row.email,
                row.is_admin,
                row.password,
                row.speciality
            );
            callback(null, updatedEmployee);
        });
    }

    static loginEmployee(email, password, callback) {
        console.log("Email:", email);
        console.log("Password:", password);

        const query = "SELECT * FROM employees WHERE email = $1";
        const values = [email];
        pool.query(query, values, (error, result) => {
            if (error) {
                console.error("Erreur de requête SQL:", error);
                return callback(error, null);
            }
            const row = result.rows[0];
            if (!row) {
                console.error("Compte employé non trouvé");
                return callback(new Error("Compte employé non trouvé"), null);
            }
            const hash = crypto.createHash("sha512");
            hash.update(password);
            const hashedPassword = hash.digest("hex");
            console.log("Mot de passe haché:", hashedPassword);
            if (hashedPassword !== row.password) {
                console.error("Mot de passe invalide");
                return callback(new Error("Invalid password"), null);
            }
            const employee = new Employee(
                row.id_employee,
                row.firstname,
                row.lastname,
                row.job,
                row.phone_number,
                row.email,
                row.is_admin,
                row.password,
                row.speciality
            );
            const token = jwt.sign(
                { id: employee.idEmployee, email: employee.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            );
            callback(null, { employee, token });
        });
    }
}

module.exports = Employee;
