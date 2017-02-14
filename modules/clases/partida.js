'use strict';
const elementos = require('./elementos');
const tablero = require('./tablero');
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const urlMongo = require('../config/conf.js').mongo.url;

class Partida {

	constructor(id, nombre, columnas, filas) {
		this._id = id;
		this._nombre = nombre;
		this._tablero = new tablero(nombre, columnas, filas);
		this._jugadores = new Map();
	}

	get tablero(){
		return this._tablero.info;
	}

	insertarTanque(tanque) {
		this._tablero.insertarTanque(tanque);
	}

	movTanque(idTanque) {
		this._tablero.mover(idTanque, "tanque");
	}

	shootTanque(idTanque) {
		this._tablero.disparar(idTanque);
	}

	girarTanque(idTanque, direccion) {
		this._tablero.girar(idTanque, direccion);
	}

	empezarPartida() {
		let interval = setInterval(this._tablero.moverBalas, 500);
	}

	addJugador(idJugador,idTanque) {
		this._jugadores.set(idJugador,idTanque);
	}

	////seguir con esto
	guardarPartida() {
		var partida = {
			id: this._id,
			nombre:this._nombre,
			dimensiones:this._tablero.dimensiones,
			elemntos: this._tablero.info,
			jugadores: Array.from(this._jugadores)
		};

		// var nom=cargarPartidas();
		// var json=JSON.parse({partida:part});
		// console.log(part);
		mongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log('conexion exitosa');

			var conex = db.collection('partida');
			// console.log(conex);
			conex.insert(partida, function() {
				console.log('insertado');
				db.close();
			})
		})
	}

	cargarPartidas() {
		mongoClient.connect(url, function(err, db) {
			assert.equal(null, err);

			var coleccion = db.collection('partida');
			coleccion.find().toArray(function(err, data) {
				return (data);
				db.close();
			});

		})
	}

	comprobarPartida(nombrep, cb) {
		mongoClient.connect(url, function(err, db) {
			assert.equal(null, err);

			var coleccion = db.collection('partida');
			coleccion.find({
				nombre: nombrep
			}).toArray(function(err, data) {
				db.close();
				cb(data.length);
			});

		})
	}

}
module.exports = Partida;