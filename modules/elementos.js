"use strict";
// Clase que define la clase tanque del juego
class Tanque{
	constructor(nombre){
		this._nombre = nombre;
		this._vida = 10;
		this._tipo = "tanque";
		this._muni = 50;
		this._x;
		this._y;
		this._o;
	}
	// ------ GETTERS ------ //
	get pos(){
		return {
			x:this._x,
			y:this._y,
			o:this._o
		}
	}
	get tipo(){
		return this._tipo;
	}
	get muni(){
		return this._muni;
	}
	get vida(){
		return this._vida;
	}
	get nombre(){
		return this._nombre;
	}
	// ------ SETTERS ------ //
	set pos(value){
		this._x = value.x;
		this._y = value.y;
	}
	set o(value){
		this._o = value;
	}
	set vida(value){
		this._vida = value;
	}
	set muni(value){
		this._muni = value;
	}
}
// Clase que define el objeto roca del juego
class Roca{
	/**
	 * Crea una roca sin parámetros, 
	 * la posición se le dará al insertarla en una casilla
	 * x representa la posición segun las columnas
	 * y representa la posición segun las filas
	 */
	constructor(){
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
	get pos(){
		return {
			x:this._x,
			y:this._y
		}
	}
	/**
	 * El tipo de elemento que es
	 * @return {string} el tipo dado en el constructor
	 */
	get tipo(){
		return this._tipo;
	}
	// ------ SETTERS ------ //
	/**
	 * Cambia el valor de la posición,
	 * de esta forma, se le asignará al meterla en una casilla
	 * @param  {Object} value la posición de la casilla en la que se quiere meter
	 */
	set pos(value){
		this._x = value.x;
		this._y = value.y;
	}
}
// Clase que define la bala tanque del juego
class Bala{
	constructor(id,o){
		this._id=id;
		this._x;
		this._y;
		this._o=o;
		this._tipo = "bala";
	}
	// ------ GETTERS ------ //
	get pos(){
		return {
			x:this._x,
			y:this._y,
			o:this._o
		}
	}
	get tipo(){
		return this._tipo;
	}
	get id(){
		return this._id;
	}
	// ------ SETTERS ------ //.
	set pos(value){
		this._x = value.x;
		this._y = value.y;
	}
}
module.exports = {tanque:Tanque,bala:Bala,roca:Roca};