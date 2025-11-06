const mongoose = require('mongoose');

let marcaSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    pais_origen: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }
});

let Marca = mongoose.model('marcas', marcaSchema);
module.exports = Marca;