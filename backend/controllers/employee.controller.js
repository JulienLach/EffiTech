const Employee = require('../models/employee.model'); // Importer le modèle Employee

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.getAllEmployees(); // Utiliser la méthode du modèle
        res.status(200).json(employees); // Renvoyer les employés
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des employés', error: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const employee = await Employee.getEmployeeById(employeeId); // Utiliser la méthode du modèle
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employé non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'employé', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const newEmployee = req.body;
    try {
        const createdEmployee = await Employee.createEmployee(newEmployee); // Utiliser la méthode du modèle
        res.status(201).json(createdEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'employé', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    try {
        const result = await Employee.updateEmployee(employeeId, updatedEmployee); // Utiliser la méthode du modèle
        if (result) {
            res.status(200).json({ message: 'Employé mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Employé non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'employé', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const result = await Employee.deleteEmployee(employeeId); // Utiliser la méthode du modèle
        if (result) {
            res.status(200).json({ message: 'Employé supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Employé non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'employé', error: error.message });
    }
};