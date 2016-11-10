"use strict";
var direcciones=["norte", "sur", "este", "oeste"]
// Clase que define el objeto tanque del juego
class Tanque {
	/**
	 * Crea un tanque con un nombre que servirá como id
	 * @param  {string} nombre nombre del tanque
	 * 
	 * la posición se le dará al insertarla en una casilla
	 * x representa la posición segun las columnas
	 * y representa la posición segun las filas
	 */
	constructor(nombre, vida, muni, o) {
			this._nombre = nombre;
			this._vida = vida || 10;
			this._tipo = "tanque";
			this._muni = muni || 50;
			this._x;
			this._y;
			this._o = o || direcciones[Math.floor(Math.random()*4)];
		}
		// ------ GETTERS ------ //
	get pos() {
		return {
			x: this._x,
			y: this._y,
			o: this._o
		}
	}
	get tipo() {
		return this._tipo;
	}
	get muni() {
		return this._muni;
	}
	get vida() {
		return this._vida;
	}
	get nombre() {
			return this._nombre;
		}
		// ------ SETTERS ------ //
	set pos(value) {
		this._x = value.x;
		this._y = value.y;
	}
	set o(value) {
		this._o = value;
	}
	set vida(value) {
		this._vida = value;
	}
	set muni(value) {
		this._muni = value;
	}
}

// Clase que define el objeto roca del juego
class Roca {
	/**
	 * Crea una roca sin parámetros, 
	 * la posición se le dará al insertarla en una casilla
	 * x representa la posición segun las columnas
	 * y representa la posición segun las filas
	 */
	constructor() {
			this._x;
			this._y;
			//Se guarda el tipo de elemento que es
			this._tipo = "roca";
		}
		// ------ GETTERS ------ //

	/**
	 * Devuelve la posición x e y de la roca
	 * @return {Object} devuelve las variables x e y en un objeto JSON
	 */
	get pos() {
			return {
				x: this._x,
				y: this._y
			}
		}
		/**
		 * Devuelve el tipo de elemento que es
		 * @return {string} el tipo dado en el constructor
		 */
	get tipo() {
			return this._tipo;
		}
		// ------ SETTERS ------ //
		/**
		 * Cambia el valor de la posición
		 * @param  {Object} value la posición de la casilla en la que se quiere meter
		 */
	set pos(value) {
		this._x = value.x;
		this._y = value.y;
	}
}

// Clase que define el objeto bala del juego
class Bala {
	/**
	 * Crea una bala con un id único y una orientación dada por el 
	 * tanque que la disparó
	 * @param  {number} id clave única que será usada para diferenciar y mover cada bala
	 * @param  {string} o  orientación de la bala, debe ser una de 
	 * las cuatro principales direcciones: "norte", "sur", "este" u "oeste".
	 * 
	 * la posición se le dará al insertarla en una casilla
	 * x representa la posición segun las columnas
	 * y representa la posición segun las filas
	 */
	constructor(id, o) {
			this._id = id;
			this._x;
			this._y;
			this._o = o;
			//Se guarda el tipo de elemento que es
			this._tipo = "bala";
		}
		// ------ GETTERS ------ //

	/**
	 * Devuelve la posición x e y de la bala junto a su orientación
	 * @return {Object} devuelve las variables o,x e y en un objeto JSON
	 */
	get pos() {
			return {
				x: this._x,
				y: this._y,
				o: this._o
			}
		}
		/**
		 * Devuelve el tipo de elemento que es
		 * @return {string} el tipo dado en el constructor
		 */
	get tipo() {
			return this._tipo;
		}
		/**
		 * Devuelve el id
		 * @return {number} el id dado en el constructor
		 */
	get id() {
			return this._id;
		}
		// ------ SETTERS ------ //

	/**
	 * Cambia el valor de la posición
	 * @param  {Object} value la posición de la casilla en la que se quiere meter
	 */
	set pos(value) {
		this._x = value.x;
		this._y = value.y;
	}
}
//Exportamos las clases Tanque, Bala y Roca
module.exports = {
	tanque: Tanque,
	bala: Bala,
	roca: Roca
};