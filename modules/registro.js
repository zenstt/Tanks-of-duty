"use strict"
//API para todo lo relacionado la gestión de usuarios, login, registro, modificación
var express = require('express');
const router = express.Router();
var mysql = require('mysql');
var BodyParser = require("body-parser");
var server = express();
var usuario = require('./usuario.js')

server.use(BodyParser.json()); //Recibir peticiones POST con datos en json
server.use(BodyParser.urlencoded({
    extended: true
})); //para formularios en post

/**
* Cadena de conexión. Actualizar según cada caso.
        const mysqlconnection={
            user: "user",
            password: "1234zxcvbnm",
            host: "mydb.cjob5ak1qqfi.eu-west-1.rds.amazonaws.com",
            port: 3306
        }
**/
const mysqlconnection = {
    user: "root",
    password: "1234",
    host: "127.0.0.1",
    port: 3306
}



function crearUsuario(usuar, password, email,cb) {
    let usu = new usuario(usuar,mysqlconnection);
    usu.local = {password:password,email:email};
    return usu.registrarLocal(cb);
}


//========================================================
//                      ENDPOINTS
//========================================================


//POST login/register
router.post('/register', (req, res) => {
    let infoLogin = {
        error: null,
        token: null,
        creado: false,
        url: '/'
    };
    crearUsuario(req.body.username, req.body.password, req.body.email, (err, num) => {
        switch (num) {
            case 1:
                infoLogin.error = "Ya existe el usuario.";
                break;
            case 2:
                infoLogin.error = "Erro interno de conexion.";
                break;
            case 0:
                infoLogin.url = 'juego.html';
                infoLogin.creado = true;
                break;
        }
        /* Borrar en un futuro */
        if (num != 0) {
            console.log(infoLogin.error);
        } else {
            console.log("Registrado correctamente")
        }

        res.json(infoLogin);
        res.end();
    })
});

module.exports = router;