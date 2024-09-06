const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.development.local') });

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

pool.on('error', (err) => {
  console.error('Error connecting to the PostgreSQL database:', err);
});

module.exports = pool;