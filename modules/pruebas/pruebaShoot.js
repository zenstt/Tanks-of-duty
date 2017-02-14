"use strict";

const tablero = require("./tablero.js");
const elementos = require("./elementos.js");

let tablero1 = new tablero('test',5,5);

let tanque1 = new elementos.tanque('tantest1');
let tanque2 = new elementos.tanque('tantest2');
let roca1 = new elementos.roca();

// //insertar tanque
// tablero1.insertar(tanque1,1,1);
// tanque1.o = "sur";


// //disparamos a una casilla vacía Checked
// tablero1.disparar(tanque1);

// //disparamos a una roca Checked
// tablero1.insertar(roca1,1,2);
// tablero1.disparar(tanque1);

// //disparamos a un tanque Checked
// tablero1.insertar(tanque2,1,2);
// tablero1.disparar(tanque1);

// //disparamos a otra bala Checked
// tablero1.insertar(tanque2,1,3);
// tanque2.o = "norte";
// tablero1.disparar(tanque1);
// tablero1.disparar(tanque2);

// //disparamos a fuera del mapa Checked
// tablero1.insertar(tanque1,0,0);
// tanque1.o = "norte";
// tablero1.disparar(tanque1);

//muestra la info del tablero y el mapa de balas por si acaso
console.log(tablero1.info);
console.log(tablero1.balas)