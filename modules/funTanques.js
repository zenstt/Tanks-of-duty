"use strict";
var express = require('express');
var mysql = require('mysql');
var BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var usuario = require('./usuario.js')
var config = require('./conf.js');
const elementos = require('./elementos.js');

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
    host: "192.168.0.32",
    port: 3306
}

function crearTanque(datos,tanque,cb){
    let usu = new usuario(datos.username,mysqlconnection);
    usu.crearTanque(datos.id,tanque,(err,num)=>{
        if (num == 2) {
            console.log(err);
            return cb(false);
        } else if (num === 0) {
            return cb(true);
            console.log("Tanque creado correctamente");
        }
    });
}
function consultarTanques(datos,cb){
    let usu = new usuario(datos.username,mysqlconnection);
    return usu.consultarTanques(datos.id,cb);

}
//========================================================
//                      ENDPOINTS
//========================================================
router.post('/crear', (req, res) => {
    let infoTanque = {
        error: null,
        creado: false
    };
    let tanque = new elementos.tanque(req.data.nombreTanque);
    crearTanque(req.user,tanque,(creado) => {
        infoTanque.creado = creado;
        if (!creado){
            infoTanque.error = "Error interno creando tanque"
        }
        res.json(infoTanque);
        res.end();
    })
});
router.post('/consultar', (req, res) => {
    let infoTanque = {
        error: null,
        tanques: []
    };
    consultarTanques(req.user,(err,num,rows) => {
        switch(num){
            case 2: infoTanque.error = "Error interno consultando tanque";break;
            case 0: infoTanque.tanques = rows;break;
        }
        res.json(infoTanque);
        res.end();
    })
});
//--------------------------------------------------------------------------------------
//	Pueh, akí tieneh que poneh err router.get de creah tanke
//	router.get etc
//
//


module.exports = router;