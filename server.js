//----------Módulos de JS----------//
const http = require('http');
const path = require('path')
const express = require("express");
const BodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const expressSession=require("express-session");
const passport=require('passport');


//----------Módulos propios----------//
/*Endpoints de usuarios y tanques*/
const apiLogin=require("./modules/endpoints/usuarios.js");
const apiTanques=require("./modules/endpoints/tanques.js");
const apiPartidas=require("./modules/endpoints/partidas.js");

/*Datos para las configuraciones */
var config = require('./modules/config/conf.js');


/*Creaccion y configuracion del servidor*/
const app = express();
const server = http.createServer(app);

app.use(BodyParser.json()); //Recibir peticiones POST con datos en json
app.use(BodyParser.urlencoded({extended:true})); //para formularios en post
app.use(express.static(path.join(__dirname,'public')));//dirección donde se encuentra la lógica de cliente


/*Configuración del uso de cookies y passport*/
app.use(cookieParser());
app.use(expressSession({
    secret:'estonoesuncifrado',
    resave:true,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());




function ensureAuth(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

//Servidor Estático.

//========================================================
//						ENDPOINTS
//========================================================
app.use('/login',apiLogin);
app.use('/tanques',apiTanques);
app.use('/partida',apiPartidas);

app.get('/juego',ensureAuth,(req,res)=>{
	res.sendFile('public/juego.html',{root: __dirname });
});

app.get('/iniciarPartida',function(req,res){
	res.json({
		map:partidas
	});
});

app.get('/test',(req,res)=>{
	if(req.isAuthenticated()){
		console.log(req);
	} else {
		console.log('NOU');	
	}
	res.end();
})

server.listen(3000, ()=>console.log('Servidor comezado con express. Escoitando no porto 3000'));

// mongoClient.connect(config.mongo.url, function(err, db) {
// 	assert.equal(null, err);

// 	var coleccion = db.collection('partida');
// 	coleccion.find().toArray(function(err, data) {
// 		var partida;
// 		var player;
// 		// console.log(data[0].jugadores[0][1]);

// 		for(var i=0;i<data.length;i++){
// 			partida= new Partida(data[i].nombre, data[i].tablero._columnas,data[i].tablero._filas);
// 			console.log("1- "+partida);
// 			for(var j=0;j<data[i].jugadores.length;j++){
// 				console.log("2- "+data[i].jugadores[j])
// 				for(var r=0;r<data[i].jugadores[j].length;r++){
// 					console.log("3- "+data[i].jugadores[j][r]);
// 					r=r+1;
// 					console.log("4- "+data[i].jugadores[j][r]._nombre);
// 					player=new Jugador(data[i].jugadores[j][r]._nombre,data[i].jugadores[j][r]._id);
// 					partida.addJugador(player);
// 				}
// 			}
			

// 			partidas.set(i+1,partida);
// 			// usuariosOnline.set(i+1,player);

// 		}
// 		db.close();
// 		console.log(partidas);
// 	});

// })