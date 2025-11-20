const mongoose = require('mongoose');

let consolaSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    any_eixida: {
        type: Number,
        required: true,
        min: 1900,
        max: 2100
    },
    foto: {
        type: String,
        required: true,
        minlength: 3
    },
    marca_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marcas'
    }
});

let Consola = mongoose.model('consolas', consolaSchema);
module.exports = Consola;