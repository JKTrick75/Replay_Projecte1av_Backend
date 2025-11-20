//REQUIRES
const express = require('express');
const Consola = require('../models/consola');
const router = express.Router();

// ============================================== //
// =============== Llistats (GET) =============== //
// ============================================== //

//Read consola
router.get('/', (req, res) => { 
    Consola.find().then(resultado => { 
        res.status(200) 
           .send( {ok: true, resultado: resultado}); 
    }).catch (error => { 
        res.status(500) 
           .send( {ok: false, error: "Error obteniendo consola"}); 
    }); 
});

//Read consola (ID)
router.get('/:id', (req, res) => { 
    Consola.findById(req.params.id).then(resultado => { 
        if(resultado) {
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la consola indicada"
            }); 
        }
    }).catch (error => {
        res.status(500) 
        .send({
            ok: false,  
            error: "Error buscando la consola indicada"
        }); 
    });  
}); 

// ============================================== //
// ============== Inserció (POST) =============== //
// ============================================== //

//Create consola
router.post('/', (req, res) => {
    //nuevoConsola
    let nuevoConsola = new Consola({ 
        nom: req.body.nom, 
        any_eixida: req.body.any_eixida,
        foto: req.body.foto,
        marca_id: req.body.marca_id
    });

    //Guardamos nuevoConsola
    nuevoConsola.save().then(resultado => { 
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
                    error:"Error añadiendo consola"}); 
        }
    });
}); 

// ============================================== //
// ============ Modificació (PUT) =============== //
// ============================================== //

//Update consola
router.put('/:id', (req, res) => { 
    Consola.findByIdAndUpdate(req.params.id, {
        $set: { 
            nom: req.body.nom, 
            any_eixida: req.body.any_eixida,
            foto: req.body.foto,
            marca_id: req.body.marca_id
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
                error: "No se ha encontrado la consola indicada"
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
                    error:"Error actualizando consola"}); 
        } 
    }); 
});

// ============================================== //
// ============ Esborrat (DELETE) =============== //
// ============================================== //

//Delete consola
router.delete('/:id', (req, res) => { 
    Consola.findByIdAndDelete(req.params.id) 
    .then(resultado => { 
        if(resultado){
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la consola indicada"
            });
        }
    }).catch(error => { 
        res.status(500) 
           .send({ok: false,  
                error:"Error eliminando consola"}); 
    }); 
}); 

// ============================================== //
module.exports = router;