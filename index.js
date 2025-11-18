//REQUIRES
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); //Cors para permitir el fetch desde externos
const fs = require('fs'); //(File System)
const path = require('path');//(path)

//RUTAS
const consolaRouter = require('./routes/consola');
const juegoRouter = require('./routes/juego');
const marcaRouter = require('./routes/marca');

// //CONEXIÓN MONGODB
// mongoose.connect('mongodb://127.0.0.1:27017/replay');

// --- CONEXIÓN A DOCUMENTDB ---

// 3. Define la ruta al certificado (que está en la misma carpeta)
const ca = path.join(__dirname, 'global-bundle.pem');

// 4. Pega tu URL (con la contraseña y BBDD añadidas)
const MONGO_URI = 'mongodb://replayadmin:Patata1?@replay.cluster-c5xld3ueaqnc.us-east-1.docdb.amazonaws.com:27017/replay?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';

// 5. Conecta usando las opciones de SSL
mongoose.connect(MONGO_URI, {
  tls: true,
  tlsCAFile: ca // Pásale el certificado
});
// -----------------------------

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