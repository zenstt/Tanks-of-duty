"use strict";
class Casilla{
	constructor(x,y){
		this._x = x;
		this._y = y;
		this._con = null;
	}
	// ------ GETTERS ------ //
	get pos(){
		return {
			x:this._x,
			y:this._y
		}
	}
	get con(){
		return this._con;
	}
	// ------ Setters ------ //
	set con(value){
		if (value != null){
			value.pos = {x:this._x,y:this._y};
		}
		this._con = value;
	}
}
module.exports = Casilla;