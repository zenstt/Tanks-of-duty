"use strict";
const tablero = require("./tablero.js");
const elementos = require("./elementos.js");

let tablero1 = new tablero('test',5,5);
// Probado que el tablero se crea corectamente en diferente tamaño
let tanque1 = new elementos.tanque('tantest1');
let tanque2 = new elementos.tanque('tantest2');
let roca1 = new elementos.roca();
let bala1 = new elementos.bala();

function pruebaMove(objeto,direccion,x,y){
	tablero1.insertar(objeto,x,y);
	objeto.o = direccion;
	console.log("Antes de moverse: ")
	console.log(tablero1.info);
	tablero1.mover(objeto);
	console.log("Despues de moverse: ")
	console.log(tablero1.info);
}

/* Pruebas para el move
1. Tanque
	a. Nada - Correcto
	b. Tanque - Correcto
	c. Roca - Correcto
	d. Bala
	e. Fin mapa
2. Bala
	a. Nada
	b. Tanque
	c. Roca
	d. Bala
	e. Fin mapa
*/
// 1.a - Probado en todas las direcciones
//pruebaMove(tanque1,"este",1,1);
//pruebaMove(tanque1,"oeste",1,1);
//pruebaMove(tanque1,"norte",1,1);
//pruebaMove(tanque1,"sur",1,1);

// 1.b - El tanque estático pierde 2 de vida y el que se mueve 1
/*
tablero1.insertar(tanque1,2,1);
tanque1.o = "sur";
pruebaMove(tanque2,"oeste",3,1);
*/

// 1.c - El tanque pierde 1 de vida al golpearse con una roca
/*
tablero1.insertar(roca1,2,1);
pruebaMove(tanque2,"oeste",3,1);
*/
// 1.d

tablero1.insertar(tanque1,2,0);
tanque1.o = "sur";
tablero1.disparar(tanque1);
console.log(tablero1.balas)
pruebaMove(tanque2,"oeste",3,1);
console.log(tablero1.balas)

