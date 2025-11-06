//REQUIRES
const express = require('express'); 
const mongoose = require('mongoose');

//RUTAS
const consolaRouter = require('./routes/consola');
const juegoRouter = require('./routes/juego');
const marcaRouter = require('./routes/marca');

//CONEXIÓN MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/replay'); 

// ================================================================================================================== //

//INICIAMOS EXPRESS
let app = express();

// ================================================================================================================== //

//iniciamos middleware
app.use(express.json());  //Para métodos que envias json como datos de entrada
app.use(express.urlencoded());  //Para métodos tradicionales de envío de datos por formulario: ?nombre=Nacho&telefono=911223344&edad=39

// ================================================================================================================== //

//rutas
app.use('/consola', consolaRouter);
app.use('/juego', juegoRouter);
app.use('/marca', marcaRouter);

// ================================================================================================================== //

//LANZAMOS EXPRESS (última línea)
app.listen(8080);