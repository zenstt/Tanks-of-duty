"use strict";
var express = require('express');
var mysql = require('mysql');
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var usuario = require('./usuario.js')
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
    usu.crearTanque(datos.ID,tanque,(err,num)=>{
        if (num == 2) {
            console.log(err);
            return cb(false);
        } else if (num === 0) {
            console.log("Tanque creado correctamente");
            return cb(true);
        }
    });
}
function consultarTanques(datos,cb){
    let usu = new usuario(datos.username,mysqlconnection);
    return usu.consultarTanques(datos.ID,cb);
}
function borrarTanque(datos,id,cb){
    let usu = new usuario(datos.username,mysqlconnection);
     usu.borrarTanque(datos.ID,id,(err,num)=>{
        if (num == 2) {
            console.log(err);
            return cb(false);
        } else if (num === 0) {
            console.log("Tanque borrado correctamente");
            return cb(true);
        }
    });
}
function modificarTanque(datos,tanque,id,cb){
    let usu = new usuario(datos.username,mysqlconnection);
     usu.modificarTanque(datos.ID,tanque,id,(err,num)=>{
        if (num == 2) {
            console.log(err);
            return cb(false);
        } else if (num === 0) {
            console.log("Tanque modificado correctamente");
            return cb(true);
        }
    });
}
//========================================================
//                      ENDPOINTS
//========================================================
router.post('/crear', (req, res) => {
    let infoTanque = {
        error: null,
        creado: false
    };
    console.log(req.body)
    let tanque = new elementos.tanque(req.body.nombreTanque);
    crearTanque(req.user,tanque,(creado) => {
        infoTanque.creado = creado;
        if (!creado){
            infoTanque.error = "Error interno creando tanque"
        }
        res.json(infoTanque);
        res.end();
    })
});
router.post('/modificar', (req, res) => {
    let infoTanque = {
        error: null,
        modificado: false
    };
    console.log(req.body)
    let tanque = new elementos.tanque(req.body.nombreTanque);
    modificarTanque(req.user,tanque,req.body.id,(modificado) => {
        infoTanque.modificado = modificado;
        if (!modificado){
            infoTanque.error = "Error interno modificando tanque"
        }
        res.json(infoTanque);
        res.end();
    })
});
router.post('/borrar', (req, res) => {
    let infoTanque = {
        error: null,
        borrado: false
    };
    console.log(req.body)
    borrarTanque(req.user,req.body.id,(borrado) => {
        infoTanque.borrado = borrado;
        if (!borrado){
            infoTanque.error = "Error interno borrando tanque"
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
            case 2: infoTanque.error = "Error interno consultando tanque";console.log(err);break;
            case 0: infoTanque.tanques = rows;break;
        }
        res.json(infoTanque);
        res.end();
    })
});

module.exports = router;