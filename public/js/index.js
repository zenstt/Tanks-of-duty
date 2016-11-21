"use strict";
$(document).ready(function(){
	$('#enviar').click(function(){
		if ($('#email') && $('#password').val()){
			var datos={
				email:$('#email').val(),
				password:$('#password').val()
			};
			$.ajax({
				url:'/login/',
				data: datos,
				method: 'POST',
				success: function(res, textStatus, xhr){
					console.log(res);
					if(res.login){
						$('#error').html('Login correcto');
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
				console.log("Password si coincide")
				$.ajax({
					url:'/login/register',
					data: datos,
					method: 'POST',
					success: function(res, textStatus, xhr){
						console.log(res);
						if(res.creado){
							$('#error').html('Cuenta creada correctamente')
						}
					}
						
				});
			} else {
				$('#error').html('Password no coincide.')
			}
		}
	});
});


