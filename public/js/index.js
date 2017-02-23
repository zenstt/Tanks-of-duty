"use strict";
$(document).ready(function(){
	// $.ajax({
	// 	url:'/iniciarPartida',
	// 	success:function(res,textStatus,xhr){
	// 		console.log(res.map.);
	// 	}
	// });
	$('#enviar').click(function(){
		if ($('#username').val() && $('#password').val()){
			var datos={
				username:$('#username').val(),
				password:$('#password').val()
			};
			$.ajax({
				url:'/login/login',
				data: datos,
				method: 'POST',
				success: function(res, textStatus, xhr){
					if(res.login){
						$('#error').html('Login correcto');
						window.location.href = res.url;
					}
				}
			});
		}
	});

	$('#enviarRegister').click(function(){
		if ($('#username').val() && $('#email').val() && $('#password').val() && $('#password2').val()){
			var datos={
				username:$('#username').val(),
				email:$('#email').val(),
				password:$('#password').val()
			};
			$('#error').html('')
			if (datos.password == $('#password2').val()){
				console.log("o contrasinal coincide")
				$.ajax({
					url:'/login/register',
					data: datos,
					method: 'POST',
					success: function(res, textStatus, xhr){
						if(res.creado){
							$.ajax({
								url:'/login/login',
								data: datos,
								method: 'POST',
								success: function(res, textStatus, xhr){
									if(res.login){
										$('#error').html('Login correcto');
										window.location.replace(res.url);
									}
								}
							});
						}
					}
				});
			} else {
				$('#error').html('O contrasinal non coincide.');
			}
		}
	});
});


