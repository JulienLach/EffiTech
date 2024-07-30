const pool = require('../config/db.config'); //importer la configuration de la base de données pour utiliser pool.query

exports.getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees'); //obtenir tous les employés
        res.status(200).json(result.rows); //renvoyer les employés
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des employés', error: error.message });
    }
};
  
exports.getEmployeeById = (req, res) => {
    const employeeId = req.params.id;
    // 
    res.send(`Obtenir l'employé avec l'ID ${employeeId}`);
};

exports.createEmployee = (req, res) => {
    const newEmployee = req.body;
    //
    res.send('Créer un nouvel employé');
};

exports.updateEmployee = (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    //
    res.send(`Mettre à jour l'employé avec l'ID ${employeeId}`);
};

exports.deleteEmployee = (req, res) => {
    const employeeId = req.params.id;
    // 
    res.send(`Supprimer l'employé avec l'ID ${employeeId}`);
};