const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors"); // Importer le middleware cors
const { authenticateToken } = require("./middleware/auth.middleware.js");
const employeeRoutes = require("./routes/employee.routes.js"); // Importer les routes d'employés
const clientRoutes = require("./routes/client.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const companyRoutes = require("./routes/company.routes.js");
const addressRoutes = require("./routes/address.routes.js");
const reportRoutes = require("./routes/report.routes.js");

dotenv.config({ path: ".env.development.local" });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json()); // passer le corps de la demande en JSON

app.get("/", (req, res) => {
    res.send("Test!");
});

// app.use(authenticateToken);

// Routes d'employés
app.use("/employees", employeeRoutes);

// Routes des clients
app.use("/clients", clientRoutes);

// Routes des événements
app.use("/events", eventRoutes);

// // Routes des adresses
app.use("/addresses", addressRoutes);

// Routes company
app.use("/company", companyRoutes);

// Route des reports
app.use("/reports", reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
