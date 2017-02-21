'use strict';
const elementos = require('./elementos');
const tablero = require('./tablero');
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const urlMongo = require('../config/conf.js').mongo.url;

class Partida {
	/**
	 * Crea una partida con una id, un nombre y el tamaño del tablero
	 * @param  {number} id id de la partida
	 * @param  {string} nombre nombre de la partida
	 * @param  {number} medida tamaño del tablero, en principio se pasa al tablero como fila y columna
	 * ya que por ahora serán tableros cuadrados
	 * 
	 * Se crea un mapa que contendrá los jugadores en la partida
	 */
	constructor(id, nombre, medida) {
		this._id = id;
		this._nombre = nombre;
		this._medida = medida;
		//los tableros en principio seran cuadrados asi que ponemos la medida como
		//filas y como columnas
		this._tablero = new tablero(nombre, medida, medida);
		this._jugadores = new Map();
	}

	/**
	 * Devuelve el tamaño de la partida
	 * @return {number} medida
	 */
	get medida() {
		return this._medida;
	}

	/**
	 * Devuelve el id de la partida
	 * @return {number} id
	 */
	get id() {
		return this._id;
	}

	/**
	 * Devuelve el nombre de la partida
	 * @return {string} nombre
	 */
	get nombre() {
		return this._nombre;
	}

	/**
	 * Devuelve las casillas ocupadas del tablero y el nombre de la partida
	 * @return {Object} Contiene los datos de cada casilla ocupada en tablero
	 * y el nombre en "nombre"
	 */
	get tablero() {
		return this._tablero.info;
	}

	/**
	 * Mete una cantidad de rocas 
	 * @param  {number} cantidad numero de rocas a añadir al mapa
	 */
	insertarRocas(cantidad) {
		for (var i = 0; i < cantidad; i++) {
			this._tablero.insertarRoca();
		}
	}

	/**
	 * Mete el tanque en el tablero
	 * @param  {Object} tanque un objeto tanque
	 */
	insertarTanque(tanque) {
		this._tablero.insertarTanque(tanque);
	}

	/**
	 * Mueve el tanque del usuario dado
	 * @param  {number} idJugador 
	 */
	moverTanque(idJugador) {
		this._tablero.mover(this._jugadores.get(idJugador), "tanque");
	}

	/**
	 * Hace que dispare el tanque del usuario dado
	 * @param  {number} idJugador 
	 */
	dispararTanque(idJugador) {
		this._tablero.disparar(this._jugadores.get(idJugador));
	}

	/**
	 * Hace que gire el tanque del usuario dado
	 * @param  {number} idJugador 
	 * @param  {string} direccion debe ser "izquierda" o "derecha" 
	 */
	girarTanque(idJugador, direccion) {
		this._tablero.girar(this._jugadores.get(idJugador), direccion);
	}

	/**
	 * genera un timer que será el que mueva las balas a cierta velocidad
	 */
	empezarPartida() {
		let interval = setInterval(this._tablero.moverBalas, 500);
	}

	/**
	 * añade el jugador a la partida con su tanque correspondiente
	 * @param {number} idJugador 
	 * @param {number} idTanque  
	 */
	meterJugador(idJugador, idTanque) {
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