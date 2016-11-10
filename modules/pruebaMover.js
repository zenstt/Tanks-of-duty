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
	tablero1.insertarTanque(objeto,x,y);
	objeto.o = direccion;
	console.log("Antes de moverse: ")
	console.log(tablero1.info);
	tablero1.mover(objeto);
	console.log("Despues de moverse: ")
	console.log(tablero1.info);
}
function pruebaShoot(objeto,direccion,x,y){
	tablero1.insertarTanque(objeto,x,y);
	objeto.o = direccion;
	tablero1.disparar(objeto);
	console.log(tablero1.info);
	console.log(tablero1.balas);
	switch(direccion){
		case "norte":tablero1.mover(tablero1.tablero[x][y-1].con);break;
		case "sur":tablero1.mover(tablero1.tablero[x][y+1].con);break;
		case "este":tablero1.mover(tablero1.tablero[x+1][y].con);break;
		case "oeste":tablero1.mover(tablero1.tablero[x-1][y].con);break;
	}
	console.log(tablero1.info);
	console.log(tablero1.balas);
}

/* Pruebas para el move
1. Tanque
	a. Nada - Correcto
	b. Tanque - Correcto
	c. Roca - Correcto
	d. Bala - Correcto
	e. Fin mapa - Correcto
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

// 1.d - Tanque recibe daño y se pone en el lugar de la bala que es borrada del tablero y del array de balas
/*
tablero1.insertar(tanque1,2,0);
tanque1.o = "sur";
tablero1.disparar(tanque1);
console.log(tablero1.balas)
pruebaMove(tanque2,"oeste",3,1);
console.log(tablero1.balas);
*/

// 1.e - No se mueve en el final del mapa en todas las direcciones
/*
pruebaMove(tanque2,"oeste",0,1);
pruebaMove(tanque2,"norte",3,0);
pruebaMove(tanque2,"este",4,0);
pruebaMove(tanque2,"sur",4,4);
*/

// 2.a - Prueba de mover una bala disparada en todas las direcciones
// pruebaShoot(tanque1,"sur",2,2);
// pruebaShoot(tanque1,"este",2,2);
// pruebaShoot(tanque1,"oeste",2,2);
// pruebaShoot(tanque1,"norte",2,2);

// 2.b - 

tablero1.insertarTanque(tanque1,0,0);
tanque1.o = "sur";
console.log(tablero1.info)
tablero1.mover(tanque1)
console.log(tablero1.info)
//pruebaShoot(tanque2,"oeste",2,0); 
