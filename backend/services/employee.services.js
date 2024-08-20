const Employee = require('../data/employee.data.js'); // Importer le modèle Employee

exports.getAllEmployees = (req, res) => {
    Employee.getAllEmployees((error, employees) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des employés', error: error.message });
        }
        res.status(200).json(employees); // Renvoyer les employés
    });
};

exports.getEmployeeById = (req, res) => {
    const idEmployee = req.params.idEmployee;
    Employee.getEmployeeById(idEmployee, (error, employee) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'employé', error: error.message });
        }
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employé non trouvé' });
        }
    });
};

exports.createEmployee = (req, res) => {
    const { firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality } = req.body;
    Employee.createEmployee(firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality, (error, createdEmployee) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la création de l\'employé', error: error.message });
        }
        res.status(201).json(createdEmployee);
    });
};

exports.updateEmployee = (req, res) => {
    const idEmployee = req.params.idEmployee;
    const { firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality } = req.body;
    Employee.updateEmployee(idEmployee, firstname, lastname, job, phoneNumber, email, isAdmin, password, speciality, (error, success) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'employé', error: error.message });
        }
        if (success) {
            res.status(200).json({ message: 'Fiche Employé mise à jour' });
        } else {
            res.status(404).json({ message: 'Employé non trouvé' });
        }
    });
};