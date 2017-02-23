"use strict";
var selected = null;
$(document).ready(function() {
	consultar()
	$('#crearTanque').click(function(){
		if ($('#tankName').val()){
			$.ajax({
				url:'/tanques/crear',
				data: {nombreTanque:$('#tankName').val()},
				method: 'POST',
				success: function(res, textStatus, xhr){
					consultar();
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
				consultar();
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
				consultar();
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
function consultar(){
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