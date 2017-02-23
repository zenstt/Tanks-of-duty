"use strict";
const Elementos = require('../clases/elementos.js');

//Creamos un tanque 
console.log("----Creamos una bala----");
let datos ={id:3,orientacion:"norte"};
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("-------------------------");
let bala1=new Elementos.bala(datos.id,datos.orientacion)
console.log(bala1);
console.log("-------------------------");

//Comprobamos los getters
console.log("-------------------Getters-------------------");
console.log("Getter de la posición");
console.log("-------------------------");
console.log("=>"+JSON.stringify(bala1.pos));
console.log("-------------------------");

console.log("Getter del tipo");
console.log("-------------------------");
console.log("=>"+bala1.tipo);
console.log("-------------------------");

console.log("Getter de la id");
console.log("-------------------------");
console.log("=>"+bala1.id);
console.log("-------------------------");

//Comprobamos los setters
console.log("-------------------Setters-------------------");
console.log("Setter de la posición");
console.log("-------------------------");
datos={x:3,y:3};
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("Antes =>"+JSON.stringify(bala1.pos));
bala1.pos=datos;
console.log("Despues =>"+JSON.stringify(bala1.pos));
console.log("-------------------------");