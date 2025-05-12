<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Recuperar contraseña</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <div class="contenedor-login">
    <header>
      <div class="logo">LOGO</div>
      <h1>Recuperar Contraseña</h1>
    </header>

    <section class="formulario">
      <form action="enviar_correo.php" method="POST">
        <h2>Ingresa tu correo</h2>
        <input type="email" name="correo" placeholder="Correo electrónico registrado" required>
        <button type="submit">Enviar datos por correo</button>
      </form>

      <div class="links">
        <a href="index.html">Volver al login</a>
      </div>
    </section>

    <footer>
            <p>© 2025 MichiSaurios | Todos los derechos reservados 📭 proyectowebgaby@gmail.com</p>

    </footer>
  </div>
</body>
</html>
