'use strict';
const elementos = require('./elementos');
const tablero = require('./tablero');
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const urlMongo = require('../config/conf.js').mongo.url;

class Partida {
	/**
	 * Crea un tanque con un nombre que servirá como id
	 * @param  {string} nombre nombre del tanque
	 * @param  {string} o orientación del tanque, si no se da este parámetro, se pondrá una orientación aleatoria
	 * @param  {number} vida vida del tanque, si no se da este parámetro, se pondrá en 10
	 * @param  {number} muni munición máxima del tanque, si no se da este parámetro, se pondrá en 50
	 * 
	 * la posición se le dará al insertarla en una casilla
	 * x representa la posición segun las columnas
	 * y representa la posición segun las filas
	 */
	constructor(id, nombre, medida) {
		this._id = id;
		this._nombre = nombre;
		//los tableros en principio seran cuadrados asi que ponemos la medida como
		//filas y como columnas
		this._tablero = new tablero(nombre, medida, medida);
		this._jugadores = new Map();
	}

	get tablero() {
		return this._tablero.info;
	}

	insertarRocas(cantidad) {
		for (var i = 0; i < cantidad; i++) {
			this._tablero.insertarRoca();
		}
	}

	insertarTanque(tanque) {
		this._tablero.insertarTanque(tanque);
	}

	movTanque(idJugador) {
		this._tablero.mover(this._jugadores.get(idJugador), "tanque");
	}

	shootTanque(idJugador) {
		this._tablero.disparar(this._jugadores.get(idJugador));
	}

	girarTanque(idJugador, direccion) {
		this._tablero.girar(this._jugadores.get(idJugador), direccion);
	}

	empezarPartida() {
		let interval = setInterval(this._tablero.moverBalas, 500);
	}

	addJugador(idJugador, idTanque) {
		this._jugadores.set(idJugador, idTanque);
	}

	// ////seguir con esto
	// guardarPartida() {
	// 	var partida = {
	// 		id: this._id,
	// 		nombre:this._nombre,
	// 		dimensiones:this._tablero.dimensiones,
	// 		elemntos: this._tablero.info,
	// 		jugadores: Array.from(this._jugadores)
	// 	};

	// 	// var nom=cargarPartidas();
	// 	// var json=JSON.parse({partida:part});
	// 	// console.log(part);
	// 	mongoClient.connect(url, function(err, db) {
	// 		assert.equal(null, err);
	// 		console.log('conexion exitosa');

	// 		var conex = db.collection('partidas');
	// 		// console.log(conex);
	// 		conex.insert(partida, function() {
	// 			console.log('insertado');
	// 			db.close();
	// 		})
	// 	})
	// }
}
module.exports = Partida;