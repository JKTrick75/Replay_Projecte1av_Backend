const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============================================== //
// ============ REGISTRO (POST) ================= //
// ============================================== //
router.post('/register', async (req, res) => {
    try {
        //Encriptamos la contraseña
        const salt = await bcrypt.genSalt(10); //El 10 es la complejidad del encriptado
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        //Creamos el usuario (rol user por defecto)
        const nuevoUsuario = new Usuario({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
            rol: 'user'
        });

        //Guardamos el usuario en BD
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).send({
            ok: true,
            mensaje: "Usuario registrado correctamente",
            usuario: {
                username: usuarioGuardado.username,
                email: usuarioGuardado.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            error: "Error registrando usuario (probablemente email o usuario duplicado)"
        });
    }
});

// ============================================== //
// ============= LOGIN (POST) =================== //
// ============================================== //
router.post('/login', async (req, res) => {
    try {
        //Buscamos usuario por username o email
        const usuario = await Usuario.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        });

        if (!usuario) {
            return res.status(404).send({ ok: false, error: "Usuario o email no encontrado" });
        }

        //Comparamos contraseñas (encripta la del login y compara el hash con la guardada en bbdd)
        const passwordValida = await bcrypt.compare(req.body.password, usuario.password);

        if (!passwordValida) {
            return res.status(401).send({ ok: false, error: "Contraseña incorrecta" });
        }

        //Generamos token JWT
        const payload = { //datos que viajan ocultos en el token
            id: usuario._id, 
            rol: usuario.rol 
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' } //tiempo de caducidad
        );

        //Enviamos respuesta con el token
        res.status(200).send({
            ok: true,
            mensaje: "Login correcto",
            accessToken: token,
            usuario: {
                id: usuario._id,
                username: usuario.username,
                email: usuario.email,
                rol: usuario.rol,
                favoritos: usuario.favoritos
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: "Error en el servidor" });
    }
});

module.exports = router;