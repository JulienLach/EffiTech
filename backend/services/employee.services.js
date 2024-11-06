const Employee = require("../data/employee.data.js"); // Importer le modèle Employee

function getAllEmployees(req, res) {
    Employee.getAllEmployees((error, employees) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération des employés",
                error: error.message,
            });
        }
        res.status(200).send(employees); // Renvoyer les employés
    });
}

function getEmployeeById(req, res) {
    const idEmployee = req.params.idEmployee;
    Employee.getEmployeeById(idEmployee, (error, employee) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération de l'employé",
                error: error.message,
            });
        }
        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send({ message: "Employé non trouvé" });
        }
    });
}

function createEmployee(req, res) {
    const {
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin = false,
        password = "",
        speciality,
    } = req.body;
    Employee.createEmployee(
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin,
        password,
        speciality,
        (error, createdEmployee) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de la création de l'employé",
                    error: error.message,
                });
            }
            res.status(201).send(createdEmployee);
        }
    );
}

function updateEmployee(req, res) {
    const idEmployee = req.params.idEmployee;
    const {
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin,
        password,
        speciality,
    } = req.body;
    Employee.updateEmployee(
        idEmployee,
        firstname,
        lastname,
        job,
        phoneNumber,
        email,
        isAdmin,
        password,
        speciality,
        (error, success) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de la mise à jour de l'employé",
                    error: error.message,
                });
            }
            if (success) {
                res.status(200).send({ message: "Fiche Employé mise à jour" });
            } else {
                res.status(404).send({ message: "Employé non trouvé" });
            }
        }
    );
}

function loginEmployee(req, res) {
    const { email, password } = req.body;
    Employee.loginEmployee(email, password, res, (error, employee) => {
        if (error) {
            return res.status(500).json({
                message: "Erreur mauvais identifiants",
                error: error.message,
            });
        }
        res.status(200).json(employee);
    });
}

exports.getAllEmployees = getAllEmployees;
exports.getEmployeeById = getEmployeeById;
exports.createEmployee = createEmployee;
exports.updateEmployee = updateEmployee;
exports.loginEmployee = loginEmployee;
