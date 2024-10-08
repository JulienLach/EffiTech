const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        console.log("Aucun token fourni"); // Ajoutez ce log
        return res.sendStatus(401); // Si aucun token n'est fourni
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Token invalide"); // Ajoutez ce log
            console.log(token);
            return res.sendStatus(403); // Si le token n'est pas valide
        }
        req.user = user;
        next(); // Passer au middleware suivant
    });
};

module.exports = { authenticateToken };
