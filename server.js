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

server.get('/juego',(req,res)=>{
	console.log(req.user)
	res.send(req.user);
})

server.listen(3000, ()=>console.log('Servidor comezado con express. Escoitando no porto 3000'));