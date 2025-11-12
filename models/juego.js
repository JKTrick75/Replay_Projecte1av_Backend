const mongoose = require('mongoose');

let juegoSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        minlength: 3
    },
    foto: {
        type: String,
        required: true,
        minlength: 3
    },
    precio: {
        type: Number,
        required: true
    },
    consolas_disponibles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consolas'
    }]
});

let Juego = mongoose.model('juegos', juegoSchema);
module.exports = Juego;