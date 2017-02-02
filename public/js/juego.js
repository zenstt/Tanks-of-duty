"use strict";
$(document).ready(function() {
	$.ajax({
		url:'/test',
		data: null,
		method: 'GET',
		success: function(res, textStatus, xhr){
			console.log("hoooolaaaa")
			console.log(res)
		}
	})
	$('#crearTanque').click(function(){
		$.ajax({
			url:'/test',
			data: null,
			method: 'GET',
			success: function(res, textStatus, xhr){
				console.log("hoooolaaaa")
				console.log(res)
			}
		})
	})
});;