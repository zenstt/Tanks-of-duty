"use strict";
//----------------------Imports-----------------------//
const casilla = require("./casilla.js");
const elementos = require("./elementos.js");

//Número que incrementará cada vez que se genere una bala, servirá como id de éstas
var contarBala = 0;

class Tablero {

	/**
	 * Crea una clase Tablero, crea un array bidimensional con las dimensiones
	 * dadas y llena cada posicion con una casilla vacía
	 *
	 * También crea dos mapas vacíos para guardar posteriormente las balas y los tanques
	 * @param  {string} nombre   
	 * @param  {number} columnas 
	 * @param  {number} filas    
	 */
	constructor(nombre, columnas, filas) {
		this._nombre = nombre;

		/*
			Restamos uno a las filas y columnas para ahorrarnos hacelo despues 
			debido a la numeración de los arrays
		 */
		this._columnas = columnas - 1;
		this._filas = filas - 1;

		this._tablero = new Array(columnas);
		for (let x = 0; x < columnas; x++) {
			this._tablero[x] = new Array(filas);
			for (let y = 0; y < filas; y++) {
				this._tablero[x][y] = new casilla(x, y);
			}
		}
		this._balas = new Map();
		this._tanques = new Map();
	}

	// ------ GETTERS ------ //

	/**
	 * Devuelve toda la información del tablero
	 * @return {Object} el objeto contiene
	 * 
	 * datos: {array} que contiene unicamente los datos necesarios de las casillas ocupadas
	 * nombre: {string} el nombre de la partida   -Duh!-
	 * dimensiones: {Object} tamaño en filas y columnas del tablero
	 */
	get info() {
		let elem = [];
		let dimensiones = {
			filas: this._filas + 1,
			columnas: this._columnas + 1
		};
		for (let x = 0; x <= this._columnas; x++) {
			for (let y = 0; y <= this._filas; y++) {
				if (this._tablero[x][y].con !== null) {
					elem.push(this._tablero[x][y].con.info);
				}
			}
		}
		return {
			datos: elem,
			nombre: this._nombre,
			dimensiones: dimensiones
		};
	}

	// ------ Funciones ------ //
	
	/**
	 * Inserta un objeto en una casilla indicada por una columna y una fila
	 * @param  {Object} objeto un objeto de la clase elementos 
	 * @param  {number} columna 
	 * @param  {number} fila    
	 * @return {Object} err es un {number} indicando el tipo de error, y log lo explica {string}
	 * un 0 significa que no hay error       
	 */
	insertar(objeto, columna, fila) {
		if (fila > this._filas || fila < 0 || columna > this._columnas || columna < 0) {
			return {err:3,log:"Error: Fuera de rango"};
		} else {
			if (this.info.length >= (this._filas + 1) * (this._columnas + 1)) {
				return {err:2,log:"Error: No hay mas espacio disponible"};
			} else {
				if (this._tablero[columna][fila].con !== null) {
					return {err:1,log:"Error: Ya hay algo en esa casilla"};
				} else {
					this._tablero[columna][fila].con = objeto;
					return {err:0,log:"Yay!"};
				}
			}
		}
	}

	/**
	 * Inserta un tanque en el tablero usando la función this.insertar
	 * y comprobamos los posibles errores. Además metemos este objeto en su mapa
	 * correspondiente
	 * @param  {Object} tanque un objeto elementos.tanque
	 * @return {Object}        basado en el error-
	 * err: {boolean} si hay cualquier clase de error que no permita que el tanque se inserte,
	 * 		devolverá true, si no hay error, false
	 * log: {string} devuelve el dato del error
	 */
	insertarTanque(tanque) {
		let ranTanqueX = Math.floor(Math.random() * (this._columnas + 1));
		let ranTanqueY = Math.floor(Math.random() * (this._filas + 1));
		let insertar=this.insertar(tanque, ranTanqueX, ranTanqueY);
		switch (insertar.err) {
			case 3:
			case 2:
				return {err:true,log:insertar.log};
			case 1:
				this.insertarTanque(tanque);
				break;
			case 0:
				this._tanques.set(tanque.id, tanque);
				return {err:false,log:insertar.log};
		}
	}

	/**
	 * Inserta una roca en el tablero usando la función this.insertar
	 * y comprobamos los posibles errores
	 * 
	 * @return {Object}        basado en el error-
	 * err: {boolean} si hay cualquier clase de error que no permita que la roca se inserte,
	 * 		devolverá true, si no hay error, false
	 * log: {string} devuelve el dato del error
	 */
	insertarRoca() {
		let ranRocaX = Math.floor(Math.random() * (this._columnas + 1));
		let ranRocaY = Math.floor(Math.random() * (this._filas + 1));
		let insertar=this.insertar(new elementos.roca(), ranRocaX, ranRocaY);
		switch (insertar.err) {
			case 3:
			case 2:
				return {err:true,log:insertar.log};
			case 1:
				this.insertarRoca();
				break;
			case 0:
				return {err:false,log:insertar.log};
		}
	}

	/**
	 * Dandole una posición con una orientación ([norte, sur, este u oeste]), segun ésta,
	 * mira si hay una casilla delante suya, si la hay, devuelve sus datos
	 * @param  {Object} pos tiene las posiciones x {number} e y {number}
	 *                      junto a la orientación {string}
	 * @return {Object} 	contiene err, que es true si hay algun error, e 
	 *                      info, que contiene los datos de la casilla  
	 */
	casillaDelante(pos) {
		switch (pos.o) {
			case "norte":
				return pos.y>0 ? {err:false,info:this._tablero[pos.x][pos.y - 1]}:{err:true,info:""};
				break;
			case "sur":
				return pos.y<this._filas ? {err:false,info:this._tablero[pos.x][pos.y + 1]}:{err:true,info:""};
				break;
			case "este":
				return pos.x<this._columnas ? {err:false,info:this._tablero[pos.x + 1][pos.y]}:{err:true,info:""};
				break;
			case "oeste":
				return pos.x>0 ? {err:false,info:this._tablero[pos.x - 1][pos.y]}:{err:true,info:""};
				break;
		}
	}

	/**
	 * Se mueve un objeto a la casilla que tiene delante
	 * @param  {number} id   id de la bala o tanque, ya que son los unicos con orientacion
	 * @param  {string} type tipo del objeto, es necesario para conseguir el objeto de su mapa correspondiente
	 * @return {nosé}      
	 */
	mover(id, type) {
		let objeto = type == "bala" ? this._balas.get(id) : this._tanques.get(id);
		let posicion = objeto.pos;
		let delante = this.casillaDelante(posicion);
		console.log(delante)
		let resultado={
			err:false,
			suceso:""
		}
		if (!delante.err) {
			let info=delante.info;
			//Si no hay nada delante, se mueve
			if (delante.info.con === null) {
				this.insertar(objeto, info.pos.x, info.pos.y);
				this.vaciarCasilla(posicion.x,posicion.y);
				if (type == "bala") {
					this._balas.set(id, objeto);
				} else {
					this._tanques.set(id, objeto);
				}
			} else {
				//Si se trata de un tanque, y hay algo delante, éste perderá vida
				if (type == "tanque") {
					objeto.vida--;
					//Hará que las rocas o los tanques pierdan vida
					if (info.con.tipo == "tanque" || info.con.tipo == "roca") {
						resultado.err=true;
						info.con.vida -= 2;
						resultado.suceso="Chocó con un tanque o roca";
					} else {
						//Las balas, en cambio, deben desaparecer ante este suceso
						//el tanque se moverá igualmente, asi que el err se queda en false
						this._balas.delete(info.con.id);
						this.vaciarCasilla(info.pos.x,info.pos.y);
						this.insertar(objeto, info.pos.x, info.pos.y);
						this.vaciarCasilla(posicion.x,posicion.y);
					}
					//en cambio, las balas, si chocan con algo desaparecerán
				} else if (type == "bala") {
					resultado.err=true;
					this._balas.delete(id);
					this.vaciarCasilla(posicion.x,posicion.y)
					//Hará que las rocas o los tanques pierdan vida
					if (info.con.tipo == "tanque" || info.con.tipo == "roca") {
						info.con.vida--;
						resultado.suceso="Chocó con un tanque o roca";
					//las balas, al chocar, se borrarán entre ellas
					} else if (info.con.tipo == "bala") {
						this._balas.delete(info.con.id);
						this.vaciarCasilla(info.pos.x,info.pos.y);
						resultado.suceso="Chocó con otra bala";
					}
				}
			}
		} else {
			//si llegase al límite de la pantalla, un tanque no haría nada,
			//pero una bala desaparece
			resultado.suceso="Llegó al límite del mapa";
			if (type == "bala") {
				this._balas.delete(id);
				this.vaciarCasilla(posicion.x,posicion.y);
			}
		}
		return resultado;
	}

	/**
	 * Cambia la orientación del tanque
	 * @param  {number} id Tanque 
	 * @param  {string} direccion debe ser "derecha" o "izquierda"
	 * @return {string}           la nueva orientación del tanque
	 */
	girar(idTanque, direccion) {
		let objeto = this._tanques.get(idTanque);
		let orientaciones = ["norte", "este", "sur", "oeste"];
		let index = orientaciones.indexOf(objeto.pos.o);
		if(direccion=="derecha"){
			objeto.o = index == orientaciones.length - 1 ? orientaciones[0] : orientaciones[index + 1];
		}else{
			objeto.o = index === 0 ? orientaciones[orientaciones.length - 1] : orientaciones[index - 1];
		}
		return objeto.pos.o;
	}

	/**
	 * Crea una bala delante del tanque y se mete en el mapa
	 * solo si tiene munición
	 * @param  {number} idTanque 
	 * @return {boolean} solo devolverá false si no hay municion o no se pudiese crear la bala por estar fuera de los limites la casilla de delante
	 */
	disparar(idTanque) {
		let objeto = this._tanques.get(idTanque);
		let delante = this.casillaDelante(objeto.pos);
		let posicion = objeto.pos;
		if (objeto.muni > 0) {
			objeto.muni--;
			if (!delante.err) {
				let info=delante.info;
				if (info.con === null) {
					let bala = new elementos.bala(contarBala, posicion.o);
					this.insertar(bala, info.pos.x, info.pos.y);
					this._balas.set(contarBala, bala);
					contarBala++;
				} else {
					if (info.con.tipo == "tanque") {
						info.con.vida--;
					}else if (info.con.tipo == "bala") {
						this._balas.delete(info.con.id);
						this.vaciarCasilla(info.pos.x,info.pos.y);
					}
				}
				return true;
			}
		}
		return false;
	}

	/**
	 * Mueve todas las balas del tablero
	 */
	moverBalas() {
		if(this._balas.size){
			for (let bala of this._balas.values()) {
				this.mover(bala.id, 'bala');
			}
		}
	}

	/**
	 * Vacía la casilla que se encuentra en las posiciones dadas
	 * @param  {number} posX posición en las columnas de la casilla
	 * @param  {number} posY posición en las filas de la casilla
	 */
	vaciarCasilla(posX,posY){
		this._tablero[posX][posY].con = null;
	}

	/**
	 * Borra los tanques u objetos con vida que hayan llegado a cero
	 * @return {array} un array que contiene los ids de los tanques eliminados
	 */
	limpiarTablero() {
		let inf = this.info.datos;
		let tanks = [];
		for (let obj of inf) {
			if (obj.vida && obj.vida <= 0) {
				if (obj.tipo == "tanque") {
					tanks.push(obj.id);
					this._tanques.delete(obj.id);
				}
				this.vaciarCasilla(obj.pos.x,obj.pos.y);
			}
		}
		return tanks;
	}

}
module.exports = Tablero;