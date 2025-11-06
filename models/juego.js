const mongoose = require('mongoose');

let juegoSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    genere: {
        type: String,
        required: true,
        minlength: 3
    },
    consolas_disponibles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consolas'
    }]
});

let Juego = mongoose.model('juegos', juegoSchema);
module.exports = Juego;