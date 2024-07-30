const dotenv = require('dotenv');
const express = require('express');
const employeeRoutes = require('./routes/employee.routes.js'); // Importer les routes d'employés

dotenv.config({ path: '.env.development.local' });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // passer le corps de la demande en JSON

app.get('/', (req, res) => {
  res.send('Test!');
});

// Routes d'employés
app.use('/', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});