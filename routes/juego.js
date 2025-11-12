//REQUIRES
const express = require('express');
const Juego = require('../models/juego');
const router = express.Router();

// ============================================== //
// =============== Llistats (GET) =============== //
// ============================================== //

//Read juego
router.get('/', (req, res) => { 
    Juego.find().then(resultado => { 
        res.status(200) 
           .send( {ok: true, resultado: resultado}); 
    }).catch (error => { 
        res.status(500) 
           .send( {ok: false, error: "Error obteniendo juego"}); 
    }); 
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => { 
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
router.delete('/:id', (req, res) => { 
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