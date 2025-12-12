//REQUIRES
const express = require('express');
const Marca = require('../models/marca');
const { verificarToken, esAdmin } = require('../middlewares/authjwt');
const router = express.Router();

// ============================================== //
// =============== Llistats (GET) =============== //
// ============================================== //

//Read marca
router.get('/', (req, res) => { 
    Marca.find().then(resultado => { 
        res.status(200) 
           .send( {ok: true, resultado: resultado}); 
    }).catch (error => { 
        res.status(500) 
           .send( {ok: false, error: "Error obteniendo marca"}); 
    }); 
});

//Read marca (ID)
router.get('/:id', (req, res) => { 
    Marca.findById(req.params.id).then(resultado => { 
        if(resultado) {
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la marca indicada"
            }); 
        }
    }).catch (error => {
        res.status(500) 
        .send({
            ok: false,  
            error: "Error buscando la marca indicada"
        }); 
    });  
}); 

// ============================================== //
// ============== Inserció (POST) =============== //
// ============================================== //

//Create marca
router.post('/', [verificarToken, esAdmin], (req, res) => {
    //nuevoMarca
    let nuevoMarca = new Marca({ 
        nom: req.body.nom, 
        pais_origen: req.body.pais_origen
    });

    //Guardamos nuevoMarca
    nuevoMarca.save().then(resultado => { 
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
                    error:"Error añadiendo marca"}); 
        }
    });
}); 

// ============================================== //
// ============ Modificació (PUT) =============== //
// ============================================== //

//Update marca
router.put('/:id', [verificarToken, esAdmin], (req, res) => { 
    Marca.findByIdAndUpdate(req.params.id, {
        $set: { 
            nom: req.body.nom, 
            pais_origen: req.body.pais_origen
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
                error: "No se ha encontrado la marca indicada"
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
                    error:"Error actualizando marca"}); 
        } 
    }); 
});

// ============================================== //
// ============ Esborrat (DELETE) =============== //
// ============================================== //

//Delete marca
router.delete('/:id', [verificarToken, esAdmin], (req, res) => { 
    Marca.findByIdAndDelete(req.params.id) 
    .then(resultado => { 
        if(resultado){
            res.status(200) 
            .send({ok: true, 
                resultado: resultado
            }); 
        }else {
            res.status(404) 
            .send({ok: false,  
                error: "No se ha encontrado la marca indicada"
            });
        }
    }).catch(error => { 
        res.status(500) 
           .send({ok: false,  
                error:"Error eliminando marca"}); 
    }); 
}); 

// ============================================== //
module.exports = router;