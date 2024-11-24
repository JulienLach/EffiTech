const Employee = require("../data/employee.data.js"); // Importer le modèle Employee

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

function createAccount(req, res) {
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

exports.loginEmployee = loginEmployee;
exports.createAccount = createAccount;
