'use strict';
const elementos = require('./elementos');
const tablero = require('./tablero');
const assert = require('assert');

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
		this._empezada=false;
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
	// insertarTanque(nombre,id) {
	// 	let tanque = new elementos.tanque(nombre,id);
	// 	this._tablero.insertarTanque(tanque);
	// }

	/**
	 * Mueve el tanque del usuario dado
	 * @param  {number} idJugador 
	 */
	moverTanque(idJugador) {
		let player = this._jugadores.get(idJugador);
		if (player && player.vivo){
			this._tablero.mover(player.tanque, "tanque");
		}
	}

	/**
	 * Hace que dispare el tanque del usuario dado
	 * @param  {number} idJugador 
	 */
	dispararTanque(idJugador) {
		let player = this._jugadores.get(idJugador);
		if (player && player.vivo){
			this._tablero.disparar(player.tanque);
		}
	}

	/**
	 * Hace que gire el tanque del usuario dado
	 * @param  {number} idJugador 
	 * @param  {string} direccion debe ser "izquierda" o "derecha" 
	 */
	girarTanque(idJugador, direccion) {
		let player = this._jugadores.get(idJugador);
		if (player && player.vivo){
			this._tablero.girar(player.tanque, direccion);
		}	
	}
	/**
	 * genera un timer que será el que mueva las balas a cierta velocidad
	 */
	empezarPartida(cb) {
		var self = this;
		let interval = setInterval(function(){
			self._tablero.moverBalas();
			let partida = self._tablero.limpiarTablero();
			for (let id of partida.tanques){
				self._jugadores.get(id).vivo=false;
			}
			console.log(partida.acabada);
			if(self._empezada && partida.acabada){
				clearInterval(interval);
				cb(self.acabarPartida());
			}
		}, 100);
	}

	acabarPartida(){
		let ganador=null;
		for(let jugador of this._jugadores){
			if(jugador[1].vivo){
				ganador={jugador:jugador[0],tanque:jugador[1].tanque};
			}
		}
		return {
			idpartida: this._id,
			ganador:ganador
		}
	}
	/**
	 * añade el jugador a la partida con su tanque correspondiente
	 * @param {number} idJugador 
	 * @param {number} idTanque  
	 */
	meterJugador(idJugador,nombreTanque, idTanque) {
		this._jugadores.set(idJugador, {tanque:idTanque,vivo:true});
		if(this._jugadores.size>1){
			this._empezada=true;
		}
		let tanque = new elementos.tanque(nombreTanque,idTanque,idJugador);
		this._tablero.insertarTanque(tanque);
	}
}
module.exports = Partida;