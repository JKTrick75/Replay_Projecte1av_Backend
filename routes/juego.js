//REQUIRES
const express = require('express');
const mongoose = require('mongoose');
const Juego = require('../models/juego');
const Consola = require('../models/consola');
const { verificarToken, esAdmin } = require('../middlewares/authjwt');
const router = express.Router();

// ============================================== //
// =============== Llistats (GET) =============== //
// ============================================== //

//Read juego
router.get('/', async (req, res) => {
    try {
        //Creamos el objeto filtro
        let filtro = {};
        //Leemos filtros
        const { consola, marca, juego } = req.query;

        if (juego) {
            filtro._id = new mongoose.Types.ObjectId(juego);
        } else if (consola) {
            //Convertimos el STRING a OBJECTID
            const consolaObjectId = new mongoose.Types.ObjectId(consola);

            //Preparamos filtro (buscando por la id de esa consola)
            filtro.consolas_disponibles = { $in: [consolaObjectId] };
        } else if (marca) {
            //Convertimos el STRING a OBJECTID
            const marcaObjectId = new mongoose.Types.ObjectId(marca);

            //Primero buscamos consolas que coincidan con el OBJECTID de la marca
            const consolasDeMarca = await Consola.find({ marca_id: marcaObjectId }).select('_id');
            
            //Extraemos los IDs de las consolas de esa marca
            const idsDeConsolas = consolasDeMarca.map(consola => consola._id);
            
            //Preparamos filtro (buscando por las ids de las consolas de esa marca)
            filtro.consolas_disponibles = { $in: idsDeConsolas };
        }

        const resultado = await Juego.find(filtro);
        res.status(200).send({ ok: true, resultado: resultado });
    } catch (error) {
        res.status(500).send({ ok: false, error: "Error obteniendo juegos" });
    }
});

//Read juego (ID)
router.get('/:id', (req, res) => { 
    Juego.findById(req.params.id).then(resultado => { 
        if(resultado) {
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la juego indicado"
            }); 
        }
    }).catch (error => {
        res.status(500) 
        .send({
            ok: false,  
            error: "Error buscando la juego indicado"
        }); 
    });  
}); 

// ============================================== //
// ============== Inserció (POST) =============== //
// ============================================== //

//Create juego
router.post('/', [verificarToken, esAdmin], (req, res) => {
    //nuevoJuego
    let nuevoJuego = new Juego({ 
        nom: req.body.nom, 
        genero: req.body.genero,
        foto: req.body.foto,
        precio: req.body.precio,
        consolas_disponibles: req.body.consolas_disponibles
    });

    //Guardamos nuevoJuego
    nuevoJuego.save().then(resultado => { 
        res.status(200) 
           .send({ok: true, 
                resultado: resultado});
    }).catch(error => { 
        //Control d'errors
        if (error.name === 'ValidationError') {
            res.status(400) //Error client
            .send({ok: false,  
                    error: "Error de validación: " + error.message });
        } else {
            res.status(500) //Error servidor
            .send({ok: false,  
                    error:"Error añadiendo juego"}); 
        } 
    });
}); 

// ============================================== //
// ============ Modificació (PUT) =============== //
// ============================================== //

//Update juego
router.put('/:id', [verificarToken, esAdmin], (req, res) => { 
    Juego.findByIdAndUpdate(req.params.id, {
        $set: { 
            nom: req.body.nom, 
            genero: req.body.genero,
            foto: req.body.foto,
            precio: req.body.precio,
            consolas_disponibles: req.body.consolas_disponibles
        } 
    }, {new: true}) //Per a retornar el document modificat
    .then(resultado => { 
        if(resultado) {
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la juego indicado"
            }); 
        }
    }).catch(error => { 
        //Control d'errors
        if (error.name === 'ValidationError') {
            res.status(400) //Error client
            .send({ok: false,  
                    error: "Error de validación: " + error.message });
        } else {
            res.status(500) //Error servidor
            .send({ok: false,  
                    error:"Error actualizando juego"}); 
        } 
    }); 
});

// ============================================== //
// ============ Esborrat (DELETE) =============== //
// ============================================== //

//Delete juego
router.delete('/:id', [verificarToken, esAdmin], (req, res) => { 
    Juego.findByIdAndDelete(req.params.id) 
    .then(resultado => { 
        if(resultado){
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la juego indicado"
            });
        }
    }).catch(error => { 
        res.status(500) 
           .send({ok: false,  
                error:"Error eliminando juego"}); 
    }); 
}); 

// ============================================== //
module.exports = router;