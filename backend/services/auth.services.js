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

exports.loginEmployee = loginEmployee;
