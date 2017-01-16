"use strict";
var express = require('express');
var mysql = require('mysql');
var BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var usuario = require('./usuario.js')
var config = require('./conf.js');

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'estonoesuncifrado',
    resave: true,
    saveUninitialized: false
}));

const mysqlconnection = {
    user: "zenstt",
    password: "1234",
    host: "192.168.0.42",
    port: 3306
}

function crearTanque(datos,tanque){
    let usu = new usuario(datos.id,mysqlconnection);
    usu.crearTanque(datos.id,tanque,(err,num)=>{
        if (num == 2) {
            console.log(err);
        } else if (num === 0) {
            
            console.log("Tanque creado correctamente");
        }
    });
}
//--------------------------------------------------------------------------------------
//	Pueh, akí tieneh que poneh err router.get de creah tanke
//	router.get etc
//
//


module.exports = router;