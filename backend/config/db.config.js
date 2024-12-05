const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});

const { Pool } = require("pg");

// ajouter une varaible dbHost pour docker, dans le contexte du conteneur docker le DB_HOST est "db" avec postgres par defaut
const dbHost = process.env.NODE_ENV === "docker" ? "db" : process.env.DB_HOST;

const pool = new Pool({
    user: process.env.DB_USER,
    host: dbHost,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("connect", () => {
    console.log("Connected to the PostgreSQL database.");
});

pool.on("error", (err) => {
    console.error("Error connecting to the PostgreSQL database:", err);
});

module.exports = pool;
