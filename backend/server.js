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
const emailRoutes = require("./routes/email.routes.js");
const authenticateToken = require("./middlewares/auth.middleware");
const runMigrations = require("./migrations/migrations.js");

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;
const ORIGIN_URL = process.env.ORIGIN_URL;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

// Liste des url autorisées pour les requêtes CORS
const allowedOrigins = [
    ORIGIN_URL, // http://localhost:3000
];

const corsOptions = {
    origin: (origin, callback) => {
        // Autorise les requêtes sans origin (ex. Postman) ou celles dans allowedOrigins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); // Limite de taille de 10MB pour le corps de la requête pour traiter les fichiers et les base64 large

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

// Routes de connexion (publique)
app.use("/auth", authRoutes);
app.post("/email/requestPasswordReset", emailRoutes);
app.post("/email/resetPassword", emailRoutes);

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

// Route des emails
app.use("/email", authenticateToken, emailRoutes);

// Fonction pour démarrer le serveur avec les migrations
async function startServer() {
    try {
        await runMigrations();
        app.listen(PORT, () => {
            console.log(`Server is running on ${SERVER_URL}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
