"use strict";
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
					html+='<div id="'+tanque.ID+'">'
					html+="<p class='nombre'> Nombre: <input type='text' value='"+tanque.nombre+"'</p>";
					html+='<p> Vida: '+tanque.hp+'</p>';
					html+='<p> Municion: '+tanque.ammo+'</p>';
					html+='<input type="button" class="borrar" value="Borrar"/>'
					html+='<input type="button" class="modificar" value="Modificar"/>'
					html+='</div>'
					html+='<hr>';
				}
				html+='</div>';
				$('#misTanques').html(html);
				borrar();
				modificar();
			}
		}
	})
}
$(document).ready(function() {
	consultar()
	$('#crearTanque').click(function(){
		$.ajax({
			url:'/tanques/crear',
			data: {nombreTanque:$('#tankName').val()},
			method: 'POST',
			success: function(res, textStatus, xhr){
				consultar();
			}
		})
	})
});;