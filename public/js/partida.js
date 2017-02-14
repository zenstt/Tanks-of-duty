"use strict";
$(document).ready(() => {
	$("#create").click(() => {
		createBoard($("#row").val());
		inserTank(3,4)
	});
});
function inserTank(row,col){
	$('#'+row+'-'+col).css('background-image','url(./img/tank_up.png)');
	$('#'+row+'-'+col).css('background-size','contain');
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