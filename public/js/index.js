"use strict";
$(document).ready(function(){
	$('#enviar').click(function(){
		if ($('#username').val() && $('#password').val()){
			console.log("asdasd")
			var datos={
				username:$('#username').val(),
				password:$('#password').val()
			};
			$.ajax({
				url:'/login/login',
				data: datos,
				method: 'POST',
				success: function(res, textStatus, xhr){
					console.log(res);
					if(res.login){
						$('#error').html('Login correcto');
						$('#juego').load(res.url)
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
						console.log(res);
						if(res.creado){
							$('#error').html('Conta creada correctamente')
							$('#juego').load(res.url)
						}
					}
						
				});
			} else {
				$('#error').html('O contrasinal non coincide.')
			}
		}
	});
});


