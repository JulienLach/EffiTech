const { body, validationResult } = require("express-validator");
const Employee = require("../data/employee.data.js"); // Importer le modèle Employee

function loginEmployee(req, res) {
    const validationChecks = [
        body("email").isEmail().normalizeEmail().notEmpty(),
        body("password").isString().trim().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
    const validationChecks = [
        body("firstname").isString().trim().escape().notEmpty(),
        body("lastname").isString().trim().escape().notEmpty(),
        body("job").isString().trim().escape().notEmpty(),
        body("phoneNumber").isString().trim().escape().notEmpty(),
        body("email").isEmail().normalizeEmail().notEmpty(),
        body("password").isString().trim().notEmpty(),
        body("speciality").isString().trim().escape().notEmpty(),
        body("isAdmin").isBoolean().optional(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
