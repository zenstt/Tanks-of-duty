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
// Clase que define la clase roca del juego
class Roca{
	constructor(){
		this._x;
		this._y;
		this._tipo = "roca";
	}
	// ------ GETTERS ------ //
	get pos(){
		return {
			x:this._x,
			y:this._y
		}
	}
	get tipo(){
		return this._tipo;
	}
	// ------ SETTERS ------ //
	set pos(value){
		this._x = value.x;
		this._y = value.y;
	}
}
// Clase que define la bala tanque del juego
class Bala{
	constructor(o){
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
	// ------ SETTERS ------ //.
	set pos(value){
		this._x = value.x;
		this._y = value.y;
	}
}
module.exports = {tanque:Tanque,bala:Bala,roca:Roca};