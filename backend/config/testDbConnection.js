const pool = require('./db.config');

pool.query('SELECT current_user', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connection successful:', res.rows);
  }
  pool.end(); // Fermer la connexion après le test
});