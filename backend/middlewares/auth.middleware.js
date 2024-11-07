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
        // return res.redirect("http://localhost:3000/login");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide." });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
