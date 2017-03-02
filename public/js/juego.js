"use strict";
// var socket = io.connect(window.location.hostname);
var socket=io.connect('192.168.0.46:3000');
// var socket=io.connect('localhost:3000',{'forceNew':true});

socket.on('actualizarPartidas',function(data){
	mostrarPartidas(data)
});

var selected = null;
$(document).ready(function() {
	consultarTanques();
	consultarPartidas();
	$('#crearTanque').click(function(){
		if ($('#tankName').val()){
			$.ajax({
				url:'/tanques/crear',
				data: {nombreTanque:$('#tankName').val()},
				method: 'POST',
				success: function(res, textStatus, xhr){
					consultarTanques();
				}
			})
		}
	})
	$('#crearPartida').click(function(){
		if ($('#nombrePartida').val() && $('#casillas').val() && selected){
			$.ajax({
				url:'/partidas/crearPartida',
				data: {
					nombrePartida:$('#nombrePartida').val(),
					casillasPartida:$('#casillas').val(),
					idTanque:selected
				},
				method: 'POST',
				success: function(res, textStatus, xhr){
					if (res.partida.error){
						alert(res.partida.message);
					} else {
						socket.emit('newPartida');
						localStorage.setItem("idPartida", res.partida.num);
						window.location.href = res.url;	
					}
				}
			})
		}
	})
});;
function borrar(){
	$('.borrar').click(function(e){
		let id = $(e.currentTarget).parent().attr('id');
		$.ajax({
			url:'/tanques/borrar',
			data: {id:id},
			method: 'POST',
			success: function(res, textStatus, xhr){
				consultarTanques();
				console.log(res)
			}
		})
	});
}
function modificar(){
	$('.modificar').click(function(e){
		let id = $(e.currentTarget).parent().attr('id');
		let name = $(e.currentTarget).siblings('.nombre').children().val();
		console.log(name)
		$.ajax({
			url:'/tanques/modificar',
			data: {id:id,nombreTanque:name},
			method: 'POST',
			success: function(res, textStatus, xhr){
				consultarTanques();
				console.log(res)
			}
		})
	});
}
function seleccionarTanque(){
	$('.seleccionar').click(function(e){
		if (selected){
			$('#'+selected).removeClass('selected');
		}
		selected = $(e.currentTarget).parent().attr('id');
		$('#'+selected).addClass('selected');
	});
}
function unirsePartida(){
	$('.partida').click(function(e){
		let id = $(e.currentTarget).parent().attr('id');
		$.ajax({
			url:'/partidas/entrarPartida',
			data: {idPartida:id,idTanque:selected},
			method: 'POST',
			success: function(res, textStatus, xhr){
				if (res.error){
					alert(res.partida.message);
				} else {
					localStorage.setItem("idPartida", res.num);
					window.location.href = res.url;	
				}
			}
		})
	});
}
function consultarPartidas(){
	$.ajax({
		url:'/partidas/obtenerPartidas',
		data: null,
		method: 'POST',
		success: function(res, textStatus, xhr){
			if (!res.error){
				mostrarPartidas(res.partidas);
				unirsePartida();
			}
		}
	})
}
function mostrarPartidas(partidas){
let html='<div>';
for (let partida of partidas){
	html+='<div id="'+partida.id+'" class="tank">'
	html+="<p class='nombre'> Nombre: "+partida.nombre+"</p>";
	html+='<p> Medida: '+partida.medida+'</p>';
	html+='<input type="button" class="partida" value="Unirse"/>'
	html+='</div>'
	html+='<hr>';
}
html+='</div>';
$('#misPartidas').html(html);
unirsePartida();
}
function consultarTanques(){
	$.ajax({
		url:'/tanques/consultar',
		data: null,
		method: 'POST',
		success: function(res, textStatus, xhr){
			if (!res.error){
				let html='<div>';
				for (let tanque of res.tanques){
					console.log(tanque)
					html+='<div id="'+tanque.ID+'" class="tank">'
					html+="<p class='nombre'> Nombre: <input type='text' value='"+tanque.nombre+"'</p>";
					html+='<p> Vida: '+tanque.hp+'</p>';
					html+='<p> Municion: '+tanque.ammo+'</p>';
					html+='<input type="button" class="borrar" value="Borrar"/>'
					html+='<input type="button" class="modificar" value="Modificar"/>'
					html+='<input type="button" class="seleccionar" value="Seleccionar"/>'
					html+='</div>'
					html+='<hr>';
				}
				html+='</div>';
				$('#misTanques').html(html);
				if (res.tanques){
					if (!selected){
						selected=res.tanques[0].ID
					}
					$('#'+selected).addClass('selected');
				}
				borrar();
				modificar();
				seleccionarTanque();
			}
		}
	})
}