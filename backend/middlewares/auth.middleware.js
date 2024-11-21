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

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Erreur de vérification du token:", err);
            return res.status(403).json({ message: "Token invalide." });
        }
        console.log("Payload décodé:", decoded);

        req.employee = {
            idEmployee: decoded.idEmployee,
            isAdmin: decoded.isAdmin,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
        };
        console.log(
            "Informations de l'employé ajoutées à req.employee:",
            req.employee
        );

        res.cookie("employee", JSON.stringify(req.employee));

        next();
    });
}

module.exports = authenticateToken;
