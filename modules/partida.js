'use strict';
const elementos = require('./elementos');
const tablero = require('./tablero');
const mongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const config=require('./conf.js');
// const Jugador = require('./jugador');
const url=config.mongo.url;

class Partida {

	constructor(nombre, columnas, filas,tick) {


		this._tablero = new tablero(nombre, columnas, filas);
		this._jugadores = new Map();
		this._tick = tick || 3000;
	}

	set tick(value){
		this._tick=value;
	}

	addTanque(nombre) {
		let taque = new elementos.tanque(nombre);
		this._tablero.insertar(tanque);
	}

	movTanque(nombre) {
		this._tablero.mover(nombre);
	}

	shootTanque(nombre) {
		this._tablero.disparar(nombre);
	}

	girarTanque(nombre, direccion) {
		this._tablero.mover(nombre, direccion);
	}

	empezarPartida() {
		let tick = 0;
		let interval = setInterval(function() {
			// this._tablero.moverBalas();
			console.log(tick);
			tick++;

		}, this._tick);

	}

	addJugador(jugador){
		this._jugadores.set(jugador.id,jugador);
	}

	guardarPartida(){
		
		// console.log(Array.from(this._jugadores));

		var part={
			nombre:this._tablero.nombre,
			tablero:this._tablero,
			jugadores:Array.from(this._jugadores)
			// jugadores:this._jugadores
		};

		// var nom=cargarPartidas();
		// var json=JSON.parse({partida:part});
		// console.log(part);
		mongoClient.connect(url,function(err,db){
			assert.equal(null,err);
			console.log('conexion exitosa');

			var conex=db.collection('partida');
			// console.log(conex);
			conex.insert(part,function(){
				console.log('insertado');
				db.close();
			})
		})
	}

	cargarPartidas(){
		mongoClient.connect(url, function(err,db){
			assert.equal(null,err);

			var coleccion=db.collection('partida');
			coleccion.find().toArray(function(err,data){
				return(data);
				db.close();
			});

		})
	}

	comprobarPartida(nombrep,cb){
		mongoClient.connect(url, function(err,db){
			assert.equal(null,err);

			var coleccion=db.collection('partida');
			coleccion.find({nombre:nombrep}).toArray(function(err,data){
				db.close();
				cb(data.length);
			});

		})
	}

}
module.exports=Partida;