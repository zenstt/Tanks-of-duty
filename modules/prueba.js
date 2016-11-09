"use strict";
const tablero = require("./tablero.js");
const elementos = require("./elementos.js");

let tablero1 = new tablero('test',5,5);
let tanque1 = new elementos.tanque('tantest1');
tanque1.o = "sur";
tablero1.insertar(tanque1,1,1);
tablero1.mover(tanque1);
tablero1.disparar(tanque1);
tablero1.girar(tanque1,"izquierda");
console.log(tablero1.info);