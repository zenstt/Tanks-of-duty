"use strict";
// var socket = io.connect(window.location.hostname);
var socket=io.connect('192.168.0.46:3000');
// var socket=io.connect('localhost:3000',{'forceNew':true});

socket.emit('entrarPartida',localStorage.getItem("idPartida"));
socket.on('test',function(data){
	console.log(data);
});
$(document).ready(() => {
	$.ajax({
		url:'/partidas/obtenerPartida',
		data: {id:localStorage.getItem("idPartida")},
		method: 'POST',
		success: function(res, textStatus, xhr){
			createBoard(res.partida.dimensiones.columnas);
			insertThings(res.partida);
		}
	})
	// inserTank(3,4)
});
function insertObject(row,col,tipo){
	if (tipo=='roca'){
		$('#'+row+'-'+col).css('background-image','url(./img/'+tipo+'.png)');
	} else {
		$('#'+row+'-'+col).css('background-image','url(./img/'+tipo+'_up.png)');
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
		insertObject(object.posX,object.posY,object.tipo);
	}
}