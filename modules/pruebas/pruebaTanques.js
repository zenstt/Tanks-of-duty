"use strict";
const Elementos = require('../clases/elementos.js');

//Creamos un tanque 
console.log("----Creamos un tanque----");
let datos ={nombre:"banana",id:3};
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("-------------------------");
let tanque1=new Elementos.tanque(datos.nombre,datos.id)
console.log(tanque1);
console.log("-------------------------");

//Comprobamos los getters
console.log("-------------------Getters-------------------");
console.log("Getter de la posición");
console.log("-------------------------");
console.log("=>"+JSON.stringify(tanque1.pos));
console.log("-------------------------");

console.log("Getter del tipo");
console.log("-------------------------");
console.log("=>"+tanque1.tipo);
console.log("-------------------------");

console.log("Getter de la id");
console.log("-------------------------");
console.log("=>"+tanque1.id);
console.log("-------------------------");

console.log("Getter de la munición");
console.log("-------------------------");
console.log("=>"+tanque1.muni);
console.log("-------------------------");

console.log("Getter de la vida");
console.log("-------------------------");
console.log("=>"+tanque1.vida);
console.log("-------------------------");

console.log("Getter del nombre");
console.log("-------------------------");
console.log("=>"+tanque1.nombre);
console.log("-------------------------");

console.log("Getter de la url donde se encuentra la IA");
console.log("-------------------------");
console.log("=>"+tanque1.IA);
console.log("-------------------------");

//Comprobamos los setters
console.log("-------------------Setters-------------------");
console.log("Setter de la posición");
console.log("-------------------------");
datos={x:3,y:3};
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("Antes =>"+JSON.stringify(tanque1.pos));
tanque1.pos=datos;
console.log("Despues =>"+JSON.stringify(tanque1.pos));
console.log("-------------------------");

console.log("Setter de la orientación");
console.log("-------------------------");
datos="norte";
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("Antes =>"+JSON.stringify(tanque1.pos));
tanque1.o=datos;
console.log("Despues =>"+JSON.stringify(tanque1.pos));
console.log("-------------------------");

console.log("Setter de la vida");
console.log("-------------------------");
datos=5;
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("Antes =>"+JSON.stringify(tanque1.vida));
tanque1.vida=datos;
console.log("=>"+tanque1.vida);
console.log("-------------------------");

console.log("Setter de la munición");
console.log("-------------------------");
datos=5;
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("Antes =>"+JSON.stringify(tanque1.muni));
tanque1.muni=datos;
console.log("=>"+tanque1.muni);
console.log("-------------------------");

console.log("Setter de la IA");
console.log("-------------------------");
datos=5;
console.log("Datos básicos: "+JSON.stringify(datos));
console.log("Antes =>"+JSON.stringify(tanque1.muni));
tanque1.muni=datos;
console.log("=>"+tanque1.muni);
console.log("-------------------------");