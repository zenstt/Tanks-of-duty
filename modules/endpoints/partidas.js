"use strict";
var express = require('express');
var mysql = require('mysql');
var BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var config = require('../config/conf.js');
var partida = require('../clases/partida.js');

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'estonoesuncifrado',
    resave: true,
    saveUninitialized: false
}));

function crearPartida(nombre,col,fila,cb){
    let part = new partida(nombre,col,fila);
    part.(datos.ID,tanque,(err,num)=>{
        if (num == 2) {
            console.log(err);
            return cb(false);
        } else if (num === 0) {
            console.log("Tanque creado correctamente");
            return cb(true);
        }
    });
}