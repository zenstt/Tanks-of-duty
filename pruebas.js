"use strict"
var Jugador = require('./modules/jugador');
var Partida = require('./modules/partida');

var aitor=new Jugador("Aitor",2);
var denis= new Jugador("Denis",3);

let partidas = [];

let partida = {
	nombre:"pepiutosase",
	c:5,
	f:7
}
let partida2 = {
	nombre:"pepiutosasasdae",
	c:5,
	f:7
}

aitor.crearPartida(partida,function(partida){
	if (!partida.err){
		partidas.push(partida.data);
	}
	console.log(partidas);
})
denis.crearPartida(partida2,function(partida){
	if (!partida.err){
		partidas.push(partida.data);
	}
	console.log(partidas);
})