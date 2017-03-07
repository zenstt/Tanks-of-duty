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

const http = require('http');
const server = http.createServer(app);
var io = null;

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
    // host: "52.57.173.168",
    host: "localhost",
    port: 3306
}

var num = 0;
var interval = null;
var partidas = new Map();
var timers = new Map();

let part = new partida(777,"juanita",10);
part.insertarRocas(Math.floor((10*10)*0.07));
partidas[777]=part
part.empezarPartida((data)=>{
    timers[data.idpartida].winner=data.ganador;
});

function crearPartida(nombre,medida,idJugador,idTanque,cb){
    if (medida>=3 && medida<=15){
        num++;
        let part = new partida(num,nombre,medida);
        part.insertarRocas(Math.floor((medida*medida)*0.07));
        partidas[num]=part;
         // part.empezarPartida();
        part.empezarPartida((data)=>{
            timers[data.idpartida].winner=data.ganador;
        });
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
        a = partidas[id].tablero;
    }
    return a ? {error:false,part:a}:{error:true,message:"No se encuentra la partida"};
}
function meterJugador(idJugador,idTanque,idPartida,cb){
    let user = new usuario('nombreTanque',mysqlconnection);
    user.consultarInfoTanque(idJugador,idTanque,(err,code,info)=>{
        if (code){
            cb(false);
        }else{
            partidas[idPartida].meterJugador(idJugador,info.nombre,idTanque);
            cb(true);
        }
    });
}
function moverJugador(idJugador,idPartida,accion,direccion){
    let part = partidas[idPartida];
    if (part){
        if (direccion){
            part.girarTanque(idJugador,direccion);
        } else {
            if(accion=="mover"){
                part.moverTanque(idJugador);
            } else {
                part.dispararTanque(idJugador);
            }
        }
        return part.tablero;
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
    res.json({partida:part,id:req.user.ID});
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
            nombre:partidas[id].nombre,
            medida:partidas[id].medida
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
                nombre:partidas[id].nombre,
                medida:partidas[id].medida
            })
        }
        io.emit("actualizarPartidas",a);
    });
    client.on('newSala',function(data){
        client.room=data.idSala;
        let buli = true;
        if (!timers[client.room]){
             let timer = setInterval(function(){
                io.to(client.room).emit('update',{partida:partidas[client.room].tablero});
                if (timers[client.room].ended){
                    clearInterval(timers[client.room].timer);
                    io.to(client.room).emit('endMatch',timers[client.room].winner);
                }
            },35);
            timers[client.room] = {id:data.idSala,timer:timer,ended:false,winner:null}
        }
        client.join(client.room);
    })
    client.on('move',function(data){
        let part = moverJugador(parseInt(data.idJugador),data.idPartida,data.accion,data.direccion);
        io.to(client.room).emit('update',{partida:part})
    })
    client.on('disconnect', function() {
        console.log('Client disconnected');
    });
}
module.exports = {router:router, socket:socket};