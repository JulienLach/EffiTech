const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employee.routes.js");
const clientRoutes = require("./routes/client.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const companyRoutes = require("./routes/company.routes.js");
const addressRoutes = require("./routes/address.routes.js");
const reportRoutes = require("./routes/report.routes.js");
const authRoutes = require("./routes/auth.routes");
const authenticateToken = require("./middlewares/auth.middleware");

dotenv.config({ path: ".env.development.local" });

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Test!");
});

// Route de connexion (publique)
app.use("/auth", authRoutes);

// Routes d'employés
app.use("/employees", authenticateToken, employeeRoutes);

// Routes des clients
app.use("/clients", authenticateToken, clientRoutes);

// Routes des événements
app.use("/events", eventRoutes);

// Routes des adresses
app.use("/addresses", addressRoutes);

// Routes company
app.use("/company", companyRoutes);

// Route des reports
app.use("/reports", reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
