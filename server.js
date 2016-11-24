const http = require('http');
const path = require('path')
const express = require("express");
const BodyParser = require("body-parser");
const apiLogin=require("./modules/registro.js");
const cookieParser=require("cookie-parser");
const expressSession=require("express-session");
const passport=require('passport');

const app = express();
const server = http.createServer(app);

app.use(BodyParser.json()); //Recibir peticiones POST con datos en json
app.use(BodyParser.urlencoded({extended:true})); //para formularios en post
app.use(express.static(path.join(__dirname,'public')));

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
app.get('/juego',ensureAuth,(req,res)=>{
	res.sendFile('public/juego.html',{root: __dirname });
});

server.listen(3000, ()=>console.log('Servidor comezado con express. Escoitando no porto 3000'));