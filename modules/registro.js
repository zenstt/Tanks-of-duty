"use strict"
//API para todo lo relacionado la gestión de usuarios, login, registro, modificación
var express=require('express');
const router=express.Router();
var mysql=require('mysql');
var BodyParser = require("body-parser");
var server = express();
var usuario=require("./usuario.js");
server.use(BodyParser.json()); //Recibir peticiones POST con datos en json
server.use(BodyParser.urlencoded({extended:true})); //para formularios en post

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
let usu = new usuario("pepito");
/**
 * Esta function sirve para crear un usuario nuevo en la base de datos si no existe ya.
 * @param {String} email - email del usuario. No puede haber 2 usuarios con el mismo email
 * @param {String} nombre - el nombre real de usuario
 * @param {String} username - el nombre de usuario en la aplicación
 * @param {String} pass - la contraseña del usuario
 * @param {cbCrearUsuario} f - callback (cb)
*/
function crearUsuario(email, nombre, username, pass, f) {
    const sql = 'SELECT * FROM usuarios.usuario where email = "' + email + '"';
    const sql2 = usu.registrar();
    // const sql2 = 'INSERT INTO usuarios.users (email, name, username, password) VALUES("' + email + '", "' + nombre + '", "' + username + '", "' + pass + '")';
    let cliente = mysql.createConnection(mysqlconnection);
    cliente.connect(err => {
        if (err) {
            console.log("\nProblema interno. Error al establecer la conexión.\n");
            return f(err, 2);
        }
        cliente.query(sql, (err, rows, fields) => {
            console.log(sql);
            if (err) {
                console.log("\nProblema interno. Error al buscar duplicados.\n");
                return f(err, 2);
            }

            if (rows.length) {
                cliente.end();
                console.log("\nUsuario ya existe\n");
                return f(err, 1);
            }
            else {
				//Si no existen usuarios con ese email, creo el usuario
                cliente.query(sql2, (err, result, fields) => {
                    console.log(sql2)
                    cliente.end();
                    if (err) {
                        console.log("\nNo se creo al usuario. Error al crear el usuario.\n");
                        return f(err, 2);
                    }

                    if (result.affectedRows > 0) {
                        console.log("\nUsuario creado\n");
                        return f(err, 0);
                    }
                })
            }
        })
    })
}

/**
* Esta function chequea si un usuario determinado esta en la base de datos.
* @param {String} email - email del usuario
* @param {String} pass - la password correspondiente al nombre de usuario
* @param {cbIniciarSesion} f - el callback
* 
*/
function iniciarSesion(email, pass, f){
	
}

/**Esta funcion actualiza los datos basicos del usuario.
 * @param {Number} jugador - el id del usuario
 * @param {String} nombre - el nombre real de usuario
 * @param {String} username - el nombre de usuario en la aplicación
 * @param {String} pass - la contraseña del usuario
 * @param {cbActualizarDatos} f - el callback
 */
function actualizarDatos(jugador, nombre, fecha, correo, sexo, f) {
	
}


//========================================================
//						ENDPOINTS
//========================================================


//POST login/register
router.post('/register', (req, res)=>{
	let infoLogin = {
        error: null,
        token: null,
        creado: false
    };

	console.log('petición recibida para registro de usuario '+ req.body.email);
	crearUsuario(req.body.email, req.body.name, req.body.username, req.body.password, (err, num) => {
            if (err) {
                infoLogin.error = "Error interno"
                res.json(infoLogin);
                console.log("error al crear usuario\n");
                res.end();
                return;
            }

            if (num == 1) {
                infoLogin.error = "El nombe de usuario ya está en uso"
                res.json(infoLogin);
                console.log("repetido nombre de user\n");
                res.end();
                return;
            }

            else if (num == 0) {
            	res.send('juego.html');
                // infoLogin.creado = true;
                // res.json(infoLogin);
                // console.log("enviado true\n")
                // res.end();
                return;
            }

            if (num == 2) {
                infoLogin.error = "Error interno"
                res.json(infoLogin);
                console.log("error\n");
                res.end();
                return;
            }
        })
    });

	
	
//POST login/ 
router.post('/', (req, res)=>{
	let infoLogin = {
        error: null,
        token: null,
        login: true
    };
	/*
	 Completar el código para hacer el login de usuario
	 Si login ok, devolver el objeto infoLogin={error:null, token:null, login: true}
	 Si login no ok, devolver el objeto infoLogin={error:"Indicar error", token:null, login:false}
	*/
	
	res.json(infoLogin);

	
});	

//POST login/actualizarUser 
router.post('/actualizarUser', (req, res)=>{
	let infoLogin = {
        error: null,
        token: null,
        user: true
    };
	/*
	 Completar el código para hacer el login de usuario
	 Si Usuario actualizado ok, devolver el objeto infoLogin={error:null, token:null, user: true}
	 Si Usuario no actualizado, devolver el objeto infoLogin={error:"Indicar error", token:null, user:false}
	*/
	
	res.json(infoLogin);

	
});	


module.exports=router;