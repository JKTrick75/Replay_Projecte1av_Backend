//REQUIRES
require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); //Cors para permitir el fetch desde externos

//RUTAS
const consolaRouter = require('./routes/consola');
const juegoRouter = require('./routes/juego');
const marcaRouter = require('./routes/marca');

// ========================================================================
// CONEXIÓN MONGODB
// ========================================================================

// mongoose.connect('mongodb://127.0.0.1:27017/replay');

// ========================================================================
// CONEXIÓN MONGODB ATLAS
// ========================================================================

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error conectando a Atlas:', err));


// ================================================================================================================== //

//INICIAMOS EXPRESS
let app = express();

// ================================================================================================================== //
//Iniciamos cors 
app.use(cors());

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