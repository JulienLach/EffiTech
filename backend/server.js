const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const employeeRoutes = require("./routes/employee.routes.js");
const clientRoutes = require("./routes/client.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const companyRoutes = require("./routes/company.routes.js");
const addressRoutes = require("./routes/address.routes.js");
const reportRoutes = require("./routes/report.routes.js");
const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes.js");
const notificationRoutes = require("./routes/notification.routes.js");
const statisticRoutes = require("./routes/statistic.routes.js");
const invoiceRoutes = require("./routes/invoice.routes.js");
const authenticateToken = require("./middlewares/auth.middleware");

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        limits: { fileSize: 50 * 1024 * 1024 }, // Limite de taille de fichier de 50MB
    })
);

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
app.use("/events", authenticateToken, eventRoutes);

// Routes des adresses
app.use("/addresses", authenticateToken, addressRoutes);

// Routes company
app.use("/company", authenticateToken, companyRoutes);

// Route des reports
app.use("/reports", authenticateToken, reportRoutes);

// Route des documents
app.use("/documents", authenticateToken, documentRoutes);

// Route des notifications
app.use("/notifications", authenticateToken, notificationRoutes);

// Route des statistiques
app.use("/statistics", authenticateToken, statisticRoutes);

// Route des factures
app.use("/invoices", authenticateToken, invoiceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
