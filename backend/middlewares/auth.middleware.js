const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const cookieHeader = req.headers.cookie;
    let token;

    if (cookieHeader) {
        const cookies = cookieHeader.split(";");
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split("=");
            if (name === "token") {
                token = value;
                break;
            }
        }
    }

    if (!token) {
        token = req.headers["authorization"]?.split(" ")[1];
    }

    if (!token) {
        return res
            .status(401)
            .json({ message: "Accès refusé. Aucun token fourni." });
    }

    jwt.verify(token, "votre_clé_secrète", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide." });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
