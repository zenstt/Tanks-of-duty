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
const apiLogin=require("./modules/endpoints/endPoint_usuarios.js");
const apiTanques=require("./modules/endpoints/endPoint_tanques.js");
const apiPartidas=require("./modules/endpoints/endPoint_partidas.js");

/*Datos para las configuraciones */
var config = require('./modules/config/conf.js');


/*Creaccion y configuracion del servidor*/
const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 80;
app.set('view engine', 'ejs');

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
app.use('/partidas',apiPartidas.router);

app.get('/juego',ensureAuth,(req,res)=>{
	res.sendFile('public/juego.html',{root: __dirname });
});

app.get('/partida',ensureAuth,(req,res)=>{
	res.sendFile('public/partida.html',{root: __dirname });
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

io.on("connection", function (client) {
    apiPartidas.socket(io, client);
});

server.listen(port, ()=>console.log('Servidor comezado con express. Escoitando no porto '+port));