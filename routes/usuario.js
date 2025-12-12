// routes/usuario.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const { verificarToken } = require('../middlewares/authjwt');

// ============================================== //
// ============ TOGGLE FAVORITO ================= //
// ============================================== //
router.post('/favoritos/:idJuego', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.userId);
        const { idJuego } = req.params;

        if (!usuario) return res.status(404).send({ ok: false, error: "Usuario no encontrado" });

        //Convertimos a string para comparar, ya que en BD son ObjectIds
        const existe = usuario.favoritos.some(id => id.toString() === idJuego);

        if (existe) { //SI YA ESTÁ -> LO QUITAMOS
            usuario.favoritos = usuario.favoritos.filter(id => id.toString() !== idJuego);
        } else { //SI NO ESTÁ -> LO AÑADIMOS
            usuario.favoritos.push(idJuego);
        }

        await usuario.save();

        res.status(200).send({
            ok: true,
            mensaje: existe ? "Eliminado de favoritos" : "Añadido a favoritos",
            favoritos: usuario.favoritos
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: "Error actualizando favoritos" });
    }
});

module.exports = router;