"use strict";
var direcciones = ["norte", "sur", "este", "oeste"];
	// Clase que define el objeto tanque del juego
class Tanque {
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
	constructor(nombre, o, vida, muni) {
		this._nombre = nombre;
		this._o = o || direcciones[Math.floor(Math.random() * 4)];
		this._vida = vida || 10;
		this._muni = muni || 50;
		//Se guarda el tipo de elemento que es
		this._tipo = "tanque";
		this._x;
		this._y;
	}

	// ------ GETTERS ------ //
	/**
	 * Devuelve la posición x e y del tanque junto a su orientación
	 * @return {Object} devuelve las variables o,x e y en un objeto JSON
	 */
	get pos() {
		return {
			x: this._x,
			y: this._y,
			o: this._o
		};
	}
	/**
	 * Devuelve el tipo de elemento que es
	 * @return {string} el tipo dado en el constructor
	 */
	get tipo() {
		return this._tipo;
	}
	/**
	 * Devuelve la munición
	 * @return {number} la munición dada en el constructor
	 */
	get muni() {
		return this._muni;
	}
	/**
	 * Devuelve la vida
	 * @return {number} la vida dada en el constructor
	 */
	get vida() {
		return this._vida;
	}
	/**
	 * Devuelve el nombre, que se usará como id
	 * @return {string} el nombre dado en el constructor
	 */
	get nombre() {
		return this._nombre;
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
	/**
	 * Cambia el valor de la orientación
	 * @param  {string} value orientación del tanque, debe ser una de 
	 * las cuatro principales direcciones: "norte", "sur", "este" u "oeste".
	 */
	set o(value) {
		this._o = value;
	}
	/**
	 * Cambia el valor de la vida
	 * @param  {number} value la vida que le queda al tanque, se usara cuando éste se dañe
	 */
	set vida(value) {
		this._vida = value;
	}
	/**
	 * Cambia el valor de la munición
	 * @param  {number} value la munición que le queda al tanque, se usara cuando éste dispare
	 */
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
		this._vida = 2;
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
		};
	}
	get vida(){
		return this._vida;
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
	set vida(value){
		this._vida = value;
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
		};
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