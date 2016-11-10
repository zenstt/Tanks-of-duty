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
	tablero1.tanques.get(objeto.nombre).o=direccion
	console.log("Antes de moverse: ")
	console.log(tablero1.info);
	tablero1.mover(objeto.nombre);
	console.log("Despues de moverse: ")
	console.log(tablero1.info);
}
function pruebaShoot(objeto,direccion,x,y){
	tablero1.insertarTanque(objeto,x,y);
	tablero1.tanques.get(objeto.nombre).o=direccion
	tablero1.disparar(objeto.nombre);
	console.log(tablero1.info);
	console.log(tablero1.balas);
	switch(direccion){
		case "norte":tablero1.mover(tablero1.tablero[x][y-1].con.id);break;
		case "sur":tablero1.mover(tablero1.tablero[x][y+1].con.id);break;
		case "este":tablero1.mover(tablero1.tablero[x+1][y].con.id);break;
		case "oeste":tablero1.mover(tablero1.tablero[x-1][y].con.id);break;
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
	a. Nada - Correcto
	b. Tanque - Correcto
	c. Roca - Correcto
	d. Bala - Correcto
	e. Fin mapa - Correcto
*/

// 1.a - Probado en todas las direcciones
// pruebaMove(tanque1,"este",1,1);
// pruebaMove(tanque1,"oeste",1,1);
// pruebaMove(tanque1,"norte",1,1);
// pruebaMove(tanque1,"sur",1,1);

// 1.b - El tanque estático pierde 2 de vida y el que se mueve 1
// tablero1.insertarTanque(tanque1,2,1);
// tablero1.tanques.get("tantest1").o="sur"
// pruebaMove(tanque2,"oeste",3,1);

// 1.c - El tanque pierde 1 de vida al golpearse con una roca
// tablero1.insertarRoca(2,1);
// pruebaMove(tanque1,"oeste",3,1);

// 1.d - Tanque recibe daño y se pone en el lugar de la bala que es borrada del tablero y del array de balas
// tablero1.insertarTanque(tanque1,2,0);
// tablero1.tanques.get("tantest1").o="sur"
// tablero1.disparar("tantest1");
// console.log(tablero1.balas)
// pruebaMove(tanque2,"oeste",3,1);
// console.log(tablero1.balas);

// 1.e - No se mueve en el final del mapa en todas las direcciones
// pruebaMove(tanque2,"oeste",0,1);
// pruebaMove(tanque2,"norte",3,0);
// pruebaMove(tanque2,"este",4,0);
// pruebaMove(tanque2,"sur",4,4);


// 2.a - Prueba de mover una bala disparada en todas las direcciones
// pruebaShoot(tanque1,"sur",2,2);
// pruebaShoot(tanque1,"este",2,2);
// pruebaShoot(tanque1,"oeste",2,2);
// pruebaShoot(tanque1,"norte",2,2);

// 2.b - Prueba donde una bala golpea a un tanque y desaparece del mapa de balas y del tablero
// tablero1.insertarTanque(tanque1,0,0);
// tablero1.tanques.get("tantest1").o="sur"
// pruebaShoot(tanque2,"oeste",2,0); 

// 2.c - Bala golpeando a una roca, desaparece del mapa de balas y del tablero
// tablero1.insertarRoca(2,1);
// pruebaShoot(tanque1,"oeste",4,1);

// 2.d - Bala golpeando con otra bala, desaparecen ambas balas del mapa y tablero
// tablero1.insertarTanque(tanque1,0,0);
// tablero1.tanques.get("tantest1").o="este";
// tablero1.disparar("tantest1");
// console.log(tablero1.info);
// pruebaShoot(tanque1,"oeste",3,0);

// 2.e - Bala en el limite, desaparece la bala y el tablero
// pruebaShoot(tanque1,"oeste",1,0);