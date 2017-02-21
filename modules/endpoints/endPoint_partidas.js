"use strict";
const express = require('express');
const mysql = require('mysql');
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const config = require('../config/conf.js');
const partida = require('../clases/partida.js');
const app = express();

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'estonoesuncifrado',
    resave: true,
    saveUninitialized: false
}));

var num = 0;

var partidas = new Map();

function crearPartida(nombre,medida){
    num++;
    let part = new partida(num,nombre,medida);
    part.insertarRocas(3);
    partidas[num]={partida:part,socketJugadores:[]};
    return num;
}
function obtenerPartida(id){
    return partidas[id].partida.tablero;
}

//========================================================
//                      ENDPOINTS
//========================================================
router.post('/crearPartida', (req, res) => {
    let part = crearPartida(req.body.nombrePartida, req.body.casillasPartida);
    res.json({partida:part,url:'/partida',login:true});
    res.end();
});
router.post('/obtenerPartida', (req, res) => {
    let part = obtenerPartida(req.body.id);
    res.json({partida:part});
    res.end();
});

router.get('/page', function(req, res) {
    res.json({
        login: true,
        url: '/partida'
    });
});

function socket(io,client){
    console.log('Client connected');
    client.on('entrarPartida',function(data){
        partidas[data].socketJugadores[client.id]=client;
        console.log(partidas[data].socketJugadores)
    })
    client.on('disconnect', function() {
        console.log('Client disconnected');
    });
}
module.exports = {router:router, socket:socket};