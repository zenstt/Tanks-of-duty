'use strict';
var Partida = require('./partida.js');
var Elemento = require('./elementos.js');

class Jugador {

	constructor(nombre, id) {
		this._nombre = nombre;
		this._id = id;
		this._tanques = new Map();
	}

	set nombre(nombre) {
		this._nombre = nombre;
	}

	get nombre() {
		return this._nombre;
	}

	set id(id) {
		this._id = id;
	}

	get id() {
		return this._id;
	}

	get tanques() {
		// return Array.from(this._tanques);
		return this._tanques;
	}

	crearPartida(inf,cb) {
		var jugador=this;
		var partida = new Partida(inf.nombre, inf.c, inf.f);

		partida.comprobarPartida(inf.nombre,function(data){
			if(data>0){
				//callback
				cb({err:1,data:'ya existe'});
			}else{
				partida.addJugador(jugador);
				cb({err:0,data:partida});
			}
			
		})
				// partida.comprobarPartida(inf.nombre, function(data,partida,jugador) {
		// 	if (data == 0) {
		// 		partida.addJugador(jugador);
		// 		cb(partida);
		// 	} else {
		// 		cb({
		// 			err: "la partida ya existe"
		// 		});
		// 	}
		// });



	}


	unirse() {

	}

	salir() {

	}

	crearTanque(nombre) {
		var nuevoTanque = new Elemento.tanque(nombre);
		this._tanques.set(nombre, nuevoTanque);
	}

	opciones() {

	}

	buscarTanque(nombre) {
		return this._tanques.get(nombre);
	}

	borrarTanque(nombre) {
		this._tanques.delete(nombre);
	}

	cargarJugador() {

	}
}

module.exports = Jugador;