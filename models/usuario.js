const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user', 
        enum: ['user', 'admin']
    },
    favoritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'juegos'
    }]
});

let Usuario = mongoose.model('usuarios', usuarioSchema);
module.exports = Usuario;