"use strict";
const express = require('express');
const mysql = require('mysql');
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const config = require('../config/conf.js');
const partida = require('../clases/partida.js');
const partida = require('../clases/usuario.js');
const app = express();

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

var num = 0;

var partidas = new Map();

function crearPartida(nombre,medida,idJugador,idTanque){
    if (medida>=3 && medida<=15){
        num++;
        let part = new partida(num,nombre,medida);
        part.insertarRocas(Math.floor((medida*medida)*0.07));
        partidas[num]={partida:part,socketJugadores:[]};
        meterJugador(idJugador,idTanque,num,(err)=>{
            if (err){
                return {error:false,num:num};
            } else {
                return {error:true,message:"No se encuentra el tanque del jugador"};
            }
        });
    } else {
        return {error:true,message:"Las partidas tienen que tener un minimo de 3 y maximo de 15"};
    }
}
function obtenerPartida(id){
    let a=null;
    if (partidas[id]){
        a = partidas[id].partida.tablero;
    }
    return a ? {error:false,part:a}:{error:true,message:"No se encuentra la partida"};
}
function meterJugador(idJugador,idTanque,idPartida,cb){
    let user = new Usuario('nombreTanque',mysqlconnection);
    user.consultarInfoTanque(idJugador,idTanque,(err,code,info)=>{
        if (code){
            console.log(err)
            cb(false);
        }else{
            partidas[idPartida].partida.meterJugador(idJugador,info.nombre,idTanque);
            cb(true);
        }
    });

}

//========================================================
//                      ENDPOINTS
//========================================================
router.post('/crearPartida', (req, res) => {
    let part = crearPartida(req.body.nombrePartida, req.body.casillasPartida,req.user,req.body.idTanque);
    res.json({partida:part,url:'/partida'});
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