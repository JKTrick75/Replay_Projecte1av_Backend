const jwt = require('jsonwebtoken');

// ==========================================
// Middleware verificación token
// ==========================================
const verificarToken = (req, res, next) => {
    //Buscamos el token en las cabeceras.
    let token = req.headers['x-access-token'];

    //Si no hay token, prohibimos el paso
    if (!token) {
        return res.status(403).send({ok: false, error: "No se ha proporcionado un token (Acceso denegado)"});
    }

    //Verificamos el token con nuestra palabra secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ok: false, error: "Token no válido o expirado"});
        }

        //Si todo va bien, guardamos el ID y el rol del usuario en la petición
        req.userId = decoded.id;
        req.userRol = decoded.rol;
        next();
    });
};

// ==========================================
// Middleware para comprobar rol ADMIN
// ==========================================
const esAdmin = (req, res, next) => {
    //Como verificarToken se ejecuta antes, ya tenemos req.userRol disponible
    if (req.userRol === 'admin') {
        next(); //Es admin, permitimos
    } else {
        res.status(403).send({ 
            ok: false, 
            error: "Requiere rol de Administrador" 
        });
    }
};

module.exports = { verificarToken, esAdmin };