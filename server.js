//========================================================
//						ENDPOINTS
//========================================================

var express = require("express");
var BodyParser = require("body-parser");
var server = express();
var apiLogin=require("./modules/registro.js");

server.use(BodyParser.json()); //Recibir peticiones POST con datos en json
server.use(BodyParser.urlencoded({extended:true})); //para formularios en post

//Servidor Estático.
server.use(express.static('public'));

server.use('/login',apiLogin);

server.listen(3000, ()=>console.log('servidor iniciado con express. Escuchando en el puerto 3000'));