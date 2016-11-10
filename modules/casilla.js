"use strict";
class Casilla{
	/**
	 * Crea una casilla dada su posición
	 * @param  {number} x guarda la posición en las columnas de la casilla
	 * @param  {number} y guarda la posición en las filas de la casilla
	 */
	constructor(x,y){
		this._x = x;
		this._y = y;
		//En esta variable se almacenará el contenido de la casilla
		this._con = null;
	}
	// ------ GETTERS ------ //

	/**
	 * Devuelve la posición x e y de la casilla
	 * @return {Object} devuelve las variables x e y en un objeto JSON
	 */
	get pos(){
		return {
			x:this._x,
			y:this._y
		}
	}
	/**
	 * Devuelve el objeto contenido en la casilla, si no hay nada, se devolverá null
	 * @return {Object} Lo que sea que esté dentro de la casilla
	 */
	get con(){
		return this._con;
	}
	// ------ Setters ------ //
	/**
	 * Cambia el valor del contenido, si no es null, se le dará la posición correcta al objeto
	 * @param  {Object} value el objeto que se quiere meter en la casilla, si no es un objeto, sera un null
	 */
	set con(value){
		if (value != null){
			value.pos = {x:this._x,y:this._y};
		}
		this._con = value;
	}
}
//Exportamos la clase Casilla
module.exports = Casilla;