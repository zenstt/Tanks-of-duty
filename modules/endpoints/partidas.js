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

var num = 0;



function crearPartida(nombre,col,fila){
    let part = new partida(num,nombre,col,fila);
    num++;
    return part.tablero;
}

//========================================================
//                      ENDPOINTS
//========================================================
router.post('/crearPartida', (req, res) => {
    let part = crearPartida(req.body.nombre, req.body.col, req.body.fila);
    res.json(part);
    res.end();
});

router.get('/page', function(req, res) {
    res.json({
        login: true,
        url: '/partida'
    });
});

module.exports = router;