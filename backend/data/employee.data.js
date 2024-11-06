const pool = require("../config/db.config"); // Importer la configuration de la base de données
const crypto = require("crypto");

/**
 * Classe représentant un employé.
 */
class Employee {
    /**
     * Crée une instance de Employee.
     * @param {number} idEmployee - L'ID de l'employé.
     * @param {string} firstname - Le prénom de l'employé.
     * @param {string} lastname - Le nom de famille de l'employé.
     * @param {string} job - Le poste de l'employé.
     * @param {string} phoneNumber - Le numéro de téléphone de l'employé.
     * @param {string} email - L'email de l'employé.
     * @param {boolean} isAdmin - Indique si l'employé est administrateur.
     * @param {string} password - Le mot de passe de l'employé.
     * @param {string} speciality - La spécialité de l'employé.
     */
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

    /**
     * Récupère tous les employés.
     * @param {function} callback - La fonction de rappel.
     */
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

    /**
     * Récupère un employé par son ID.
     * @param {number} idEmployee - L'ID de l'employé.
     * @param {function} callback - La fonction de rappel.
     */
    static getEmployeeById(idEmployee, callback) {
        const query = "SELECT * FROM employees WHERE id_employee = $1";
        const values = [idEmployee];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
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
            callback(null, employee);
        });
    }

    /**
     * Crée un nouvel employé.
     * @param {string} firstname - Le prénom de l'employé.
     * @param {string} lastname - Le nom de famille de l'employé.
     * @param {string} job - Le poste de l'employé.
     * @param {string} phoneNumber - Le numéro de téléphone de l'employé.
     * @param {string} email - L'email de l'employé.
     * @param {boolean} [isAdmin=false] - Indique si l'employé est administrateur.
     * @param {string} [password=""] - Le mot de passe de l'employé.
     * @param {string} speciality - La spécialité de l'employé.
     * @param {function} callback - La fonction de rappel.
     */
    static createEmployee(
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin = false, // Par défaut, l'employé n'est pas un admin
        password = "",
        speciality,
        callback
    ) {
        let hashedPassword = null; // Initialiser le mot de passe haché à null pour tester
        if (password) {
            const hash = crypto.createHash("sha512");
            hash.update(password);
            hashedPassword = hash.digest("hex");
        }

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

            // Retourner le nouvel employé
            callback(null, newEmployee);
        });
    }

    /**
     * Met à jour un employé.
     * @param {number} idEmployee - L'ID de l'employé.
     * @param {string} firstname - Le prénom de l'employé.
     * @param {string} lastname - Le nom de famille de l'employé.
     * @param {string} job - Le poste de l'employé.
     * @param {string} phoneNumber - Le numéro de téléphone de l'employé.
     * @param {string} email - L'email de l'employé.
     * @param {boolean} isAdmin - Indique si l'employé est administrateur.
     * @param {string} password - Le mot de passe de l'employé.
     * @param {string} speciality - La spécialité de l'employé.
     * @param {function} callback - La fonction de rappel.
     */
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

    /**
     * Connecte un employé.
     * @param {string} email - L'email de l'employé.
     * @param {string} password - Le mot de passe de l'employé.
     * @param {function} callback - La fonction de rappel.
     */
    static loginEmployee(email, password, callback) {
        const query = "SELECT * FROM employees WHERE email = $1";
        const values = [email];

        pool.query(query, values, (error, result) => {
            const row = result.rows[0];

            if (!row) {
                console.error("Compte employé non trouvé");
                return callback(new Error("Compte employé non trouvé"), null);
            }
            const hash = crypto.createHash("sha512");
            hash.update(password);
            const hashedPassword = hash.digest("hex");

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
            callback(null, employee);
        });
    }
}

module.exports = Employee;
