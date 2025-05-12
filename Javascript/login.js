document.getElementById("loginForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const usuario = document.getElementById("username").value;
	const contrasena = document.getElementById("password").value;
	const tipo = document.getElementById("tipo").value;

	const datos = new URLSearchParams();
	datos.append("usuario", usuario);
	datos.append("contrasena", contrasena);
	datos.append("tipo", tipo);

	fetch("PHP/login.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: datos.toString()
	})
	.then(res => res.json())
	.then(data => {
		if (data.success) {
			window.location.href = data.redirect;
		} else {
			alert("Usuario o contraseña incorrectos");
		}
	})
	.catch(() => alert("Error al conectar con el servidor."));
});
