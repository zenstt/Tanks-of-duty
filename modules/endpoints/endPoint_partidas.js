"use strict";
const express = require('express');
const mysql = require('mysql');
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const config = require('../config/conf.js');
const partida = require('../clases/partida.js');
const usuario = require('../clases/usuario.js');
const elementos = require('../clases/elementos.js');
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

let part = new partida(777,"juanita",10);
part.insertarRocas(Math.floor((10*10)*0.07));
partidas[777]={partida:part,socketJugadores:[]};
part.empezarPartida();

function crearPartida(nombre,medida,idJugador,idTanque,cb){
    if (medida>=3 && medida<=15){
        num++;
        let part = new partida(num,nombre,medida);
        part.insertarRocas(Math.floor((medida*medida)*0.07));
        partidas[num]={partida:part,socketJugadores:[]};
        part.empezarPartida();

        meterJugador(idJugador,idTanque,num,(err)=>{
            if (err){
                cb({error:false,num:num});
            } else {
                cb({error:true,message:"No se encuentra el tanque del jugador"});
            }
        });
    } else {
        cb({error:true,message:"Las partidas tienen que tener un minimo de 3 y maximo de 15"});
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
    console.log(idJugador)
    console.log(idTanque)
    console.log(idPartida)
    let user = new usuario('nombreTanque',mysqlconnection);
    user.consultarInfoTanque(idJugador,idTanque,(err,code,info)=>{
        if (code){
            cb(false);
        }else{
            partidas[idPartida].partida.meterJugador(idJugador,info.nombre,idTanque);
            cb(true);
        }
    });
}
function moverJugador(idJugador,idPartida,accion,direccion){
    let part = partidas[idPartida];
    if (part){
        if (direccion){
            part.partida.girarTanque(idJugador,direccion);
        } else {
            if(accion=="mover"){
                part.partida.moverTanque(idJugador);
            } else {
                part.partida.dispararTanque(idJugador);
            }
        }
        return part.partida.tablero;
    } else {

    }
}
//========================================================
//                      ENDPOINTS
//========================================================
router.post('/crearPartida', (req, res) => {
    crearPartida(req.body.nombrePartida, req.body.casillasPartida,req.user.ID,req.body.idTanque,(data)=>{
        res.json({partida:data,url:'/partida'});
        res.end();
    });
});
router.post('/obtenerPartida', (req, res) => {
    let part = obtenerPartida(req.body.id);
    res.json({partida:part});
    res.end();
});
router.post('/entrarPartida', (req, res) => {
    meterJugador(req.user.ID,req.body.idTanque,req.body.idPartida,(code)=>{
        if (code){
            res.json({error:false,num:req.body.idPartida,url:'/partida'});
            res.end();
        } else {
            res.json({error:true,message:"No se encuentra la partida"});
            res.end();
        }
    });
});
router.post('/obtenerPartidas', (req, res) => {
    let a = [];
    for (let id in partidas){
        a.push({
            id:id,
            nombre:partidas[id].partida.nombre,
            medida:partidas[id].partida.medida
        })
    }
    res.json({error:false,partidas:a});
    res.end();
});
router.post('/move',(req,res)=>{
    let part = moverJugador(req.user.ID,req.body.data.idPartida,req.body.data.accion,req.body.data.direccion);
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
    client.on('newPartida',function(data){
        let a = [];
        for (let id in partidas){
            a.push({
                id:id,
                nombre:partidas[id].partida.nombre,
                medida:partidas[id].partida.medida
            })
        }
        io.emit("actualizarPartidas",a);
    })
    client.on('disconnect', function() {
        console.log('Client disconnected');
    });
}
module.exports = {router:router, socket:socket};