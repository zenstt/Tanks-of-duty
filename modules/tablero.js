"use strict";
const casilla = require("./casilla.js");
const elementos = require("./elementos.js");
var contarBala = 0;
class Tablero{
	constructor(nombre,columnas,filas){
		this._nombre = nombre;
		this._columnas = columnas-1;
		this._filas = filas-1;
		this._tablero = new Array(columnas);
		for (let x = 0;x<columnas;x++){
			this._tablero[x] = new Array(filas);
			for (let y=0;y<filas;y++){
				this._tablero[x][y] = new casilla(x,y);
			}
		}
		this._balas = new Map();
		this._tanques = new Map();
	}
	// ------ GETTERS ------ //
	get nombre(){
		return this._nombre;
	}
	get dimension(){
		return {filas:this._filas+1,columnas:this._columnas+1};
	}
	get tablero(){
		return this._tablero;
	}
	get info(){
		let elem = [];	
		for (let x = 0;x<=this._columnas;x++){
			for (let y=0;y<=this._filas;y++){
				if(this._tablero[x][y].con !== null){
					elem.push(this._tablero[x][y].con);
				}
			}
		}
		return elem;
	}
	get balas(){
		return this._balas;
	}
	get tanques(){
		return this._tanques;
	}
	// ------ Funciones ------ //
	// Funcion que inserta un objeto en una casilla en la fila y columna indicados
	insertar(objeto,columna,fila){
		if (fila>this._filas || fila<0 || columna>this._columnas || columna<0){
			console.log("Error: Fuera de rango");
			return 3;
		} else {
			if (this.info.length >= (this._filas+1)*(this._columnas+1)){
				console.log("No hay mas espacio disponible");
				return 2;
			} else {
				if (this._tablero[columna][fila].con !== null){
					return 1;
				} else {
					this._tablero[columna][fila].con = objeto;
					return 0;
				}
			}
		}
	}

	insertarTanque(tanque){
		let ranTanqueX = Math.floor(Math.random()*(this._columnas+1));
		let ranTanqueY = Math.floor(Math.random()*(this._filas+1));
		switch (this.insertar(tanque,ranTanqueX,ranTanqueY)){
			case 3: return "Error: Fuera de rango";
			case 2: return "Error: Espacio no disponible";
			case 1: this.insertarTanque(tanque);break;
			case 0: this._tanques.set(tanque.nombre,tanque);return true;
		}
	}

	insertarRoca() {
		let ranRocaX = Math.floor(Math.random()*(this._columnas+1));
		let ranRocaY = Math.floor(Math.random()*(this._filas+1));
		switch (this.insertar(new elementos.roca(),ranRocaX,ranRocaY)){
			case 3: return "Error: Fuera de rango";
			case 2: return "Error: Espacio no disponible";
			case 1: this.insertarRoca();break;
			case 0: return true;
		}
	}
	
	// Funcion que devuelve el contenido de la casilla de delante del objeto
	casillaDelante(objeto){
		let pos = objeto.pos;
		switch (pos.o){
			case "norte":if(pos.y>0){return this._tablero[pos.x][pos.y-1];} else {return false;}break;
			case "sur":if(pos.y<this._filas){return this._tablero[pos.x][pos.y+1];} else {return false;}break;
			case "este":if(pos.x<this._columnas){return this._tablero[pos.x+1][pos.y];} else {return false;}break;
			case "oeste":if(pos.x>0){return this._tablero[pos.x-1][pos.y];} else {return false;}break;
			default: console.log("Eso no es una orientacion"); break;
		}
	}
	mover(id){
		let objeto= typeof(id)=="number" ? this._balas.get(id):this._tanques.get(id);
		let delante = this.casillaDelante(objeto);
		let posicion = objeto.pos;
		if (delante){
			if(delante.con === null){
				this.insertar(objeto,delante.pos.x,delante.pos.y);
				this._tablero[posicion.x][posicion.y].con = null;
				if (objeto.tipo=="bala"){
					this._balas.set(id,objeto);
				}
				if (objeto.tipo =="tanque"){
					this._tanques.set(id,objeto);
				}
			} else {
				if (objeto.tipo == "tanque"){
					if (delante.con.tipo == "tanque"){
						delante.con.vida-=2;
						objeto.vida--;
					} else if (delante.con.tipo == "roca") {
						delante.con.vida-=2;
						objeto.vida--;
					} else if (delante.con.tipo == "bala"){
						objeto.vida--;
						this._balas.delete(delante.con.id);
						this.insertar(objeto,delante.pos.x,delante.pos.y);
						this._tablero[posicion.x][posicion.y].con = null;
					}
				} else if (objeto.tipo == "bala"){
					if (delante.con.tipo == "tanque"){
						delante.con.vida--;
						this._balas.delete(id);
						this._tablero[posicion.x][posicion.y].con = null;
					} else if (delante.con.tipo == "roca") {
						delante.con.vida--;
						this._balas.delete(id);
						this._tablero[posicion.x][posicion.y].con = null;
					} else if (delante.con.tipo == "bala"){
						this._balas.delete(id);
						this._balas.delete(delante.con.id);
						this._tablero[delante.pos.x][delante.pos.y].con = null;
						this._tablero[posicion.x][posicion.y].con = null;
					}
				}
			}
		} else {
			if (objeto.tipo =="bala"){
				this._balas.delete(id);
				this._tablero[posicion.x][posicion.y].con = null;
			}
		}
		return objeto;
	}

	girar(id,direccion){
		let objeto=this._tanques.get(id);
		let orientaciones = ["norte","este","sur","oeste"];
		let index = orientaciones.indexOf(objeto.pos.o);
		switch (direccion){
			case "derecha": objeto.o = index==orientaciones.length-1 ? orientaciones[0]:orientaciones[index+1];break;
			case "izquierda": objeto.o = index===0 ? orientaciones[orientaciones.length-1]:orientaciones[index-1];break;
			default: console.log("Error en la direccion de giro");
		}
		return objeto;
	}
	disparar(id){	
		let objeto=this._tanques.get(id);
		let delante = this.casillaDelante(objeto);
		let posicion = objeto.pos;
		if (objeto.muni>0){
			objeto.muni--;
			if(delante){
				if (delante.con === null){
					let bala = new elementos.bala(contarBala,posicion.o);
					this.insertar(bala,delante.pos.x,delante.pos.y);
					this._balas.set(contarBala,bala);
					contarBala++;
				} else {
					if(delante.con.tipo=="tanque"){
						delante.con.vida--;
					}
					if(delante.con.tipo=="bala"){
						this._balas.delete(delante.con.id);
						this._tablero[delante.pos.x][delante.pos.y].con = null;
						return false;
					}
				}
				return true;
			}
		}
		return false;
	}

	moverBalas(){
		for (let bala of this._balas.values()) {
			this.mover(bala.id);
		}	
	}

	limpiarTablero(){
		let inf = this.info;
		let tanks = [];
		for (let obj of inf){
			if (obj.vida <= 0){		
				if (obj.tipo =="tanque"){
					tanks.push(this._tanques.get(obj.nombre));
					this._tanques.delete(obj.nombre);
				}
				this._tablero[obj.pos.x][obj.pos.y].con = null;
				return tanks;
			}
		}
	}

}
module.exports = Tablero;