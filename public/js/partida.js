"use strict";
// var socket = io.connect(window.location.hostname);
var socket=io.connect('192.168.0.15:3000');
// var socket=io.connect('localhost:3000',{'forceNew':true});
var timer = null;

socket.on('update',function(data){
	createBoard(data.partida.dimensiones.columnas);
	insertThings(data.partida);
});
socket.on('endMatch',function(data){
	console.log(data);
});
loadImages();
$(document).ready(() => {
	let id = localStorage.getItem("idPartida");
	$.ajax({
		url:'/partidas/obtenerPartida',
		data: {id:id},
		method: 'POST',
		success: function(res, textStatus, xhr){
			localStorage.setItem("idJugador",res.id);
			socket.emit('newSala',{idSala:id,idJugador:res.id});
			createBoard(res.partida.part.dimensiones.columnas);
			insertThings(res.partida.part);
		}
	})
	$(window).keyup(function(e){
		switch (e.keyCode){
			case 32: action('shoot');break;
			case 37: action('girar','izquierda');break;
			case 38: action('mover');break;
			case 39: action('girar','derecha');break;
		}
	})
});

function loadImages(){
	$('#loadImages').append("<img src='img/bala_este.png'/>");
	$('#loadImages').append("<img src='img/bala_oeste.png'/>");
	$('#loadImages').append("<img src='img/bala_norte.png'/>");
	$('#loadImages').append("<img src='img/tanque_este.png'/>");
	$('#loadImages').append("<img src='img/tanque_oeste.png'/>");
	$('#loadImages').append("<img src='img/tanque_norte.png'/>");
	$('#loadImages').append("<img src='img/tanque_sur.png'/>");
	$('#loadImages').empty();
}
function action(act,direction){
	let data = {
		idPartida:localStorage.getItem("idPartida"),
		idJugador:localStorage.getItem("idJugador"),
		accion:act,
		direccion:null
	}
	if(act=='girar'){
		data.direccion=direction;
	}
	socket.emit('move',data);
}

function insertObject(object){
	let row = object.y
	let col = object.x
	if (object.tipo=='roca'){
		$('#'+row+'-'+col).css('background-image','url(./img/'+object.tipo+'.png)');
	} else {
		$('#'+row+'-'+col).css('background-image','url(./img/'+object.tipo+'_'+object.o+'.png)');
		$('#'+row+'-'+col).css('background-size','contain');
	}
	$('#'+row+'-'+col).css('background-repeat','no-repeat');
}

function createBoard(row) {
	let column=row;
	let tileSet = "",
		fila = 0,
		columna = 0;

	for (var i = 0; i < row * column; i++) {
		if (columna == column) {
			columna = 0;
			fila++;
		}
		tileSet += "<div class='casilla' id='" + (fila) + "-" + (columna) + "''></div>";
		columna++;
	}
	$("#board").html(tileSet);
	$(".casilla").css("heigth", 500 / row - 2);
	$(".casilla").css("width", 500 / column - 2);
}
function insertThings(board){
	for (let object of board.datos){
		insertObject(object);
	}
}