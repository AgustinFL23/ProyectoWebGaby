// session.js - Manejo de sesiones con cookies y tiempo de inactividad

// Función para establecer una cookie
function setCookie(name, value, durationMinutes) {
  const date = new Date();
  date.setTime(date.getTime() + (durationMinutes * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
  console.log('Cookie seteada');
}

// Función para obtener el valor de una cookie
function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  console.log('inicio de la lectura de cookie');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Función para eliminar una cookie
function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

// Función para validar el inicio de sesión (formulario en index.html)
function validarLogin() {
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const tipoUsuario = document.getElementById("tipo").value;
  
  // Aquí deberías implementar una validación real de credenciales
  // Este es solo un ejemplo simple
  if (correo.length > 0 && password.length > 0) {
    // Almacenar datos de sesión en cookies (duración: 60 minutos)
    setCookie("correo", correo, 60);
    setCookie("tipoUsuario", tipoUsuario, 60);
    setCookie("sesionActiva", "true", 60);
    
    // Redirigir a menu.html
    return false; // Evitar envío del formulario
  } else {
    
    return false;
  }
}

// Función para verificar si hay una sesión activa
function verificarSesion() {
  const sesionActiva = getCookie("sesionActiva");
  console.log('cookie leida')
  if (!sesionActiva) {
    // No hay sesión activa, redirigir al index.html
    window.location.href = "/index.html";
  }
}

// Función para cerrar la sesión
function cerrarSesion() {
  deleteCookie("username");
  deleteCookie("tipoUsuario");
  deleteCookie("sesionActiva");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  window.location.href = "../index.html";
=======
  window.location.href = "/index.html";
>>>>>>> a7c21e4 (sigamos)
=======
  window.location.href = "index.html";
>>>>>>> d57b4bf (sigamos)
=======
  window.location.href = "../index.html";
>>>>>>> 4da2a5b (Alumno funcional)
}

// Control de inactividad
let tiempoInactividad;
const TIEMPO_LIMITE = 60000; // 1 minuto en milisegundos

// Función para reiniciar el temporizador de inactividad
function reiniciarTemporizador() {
  clearTimeout(tiempoInactividad);
  tiempoInactividad = setTimeout(function() {
    // Si la sesión está activa, cerrarla por inactividad
    if (getCookie("sesionActiva")) {
      alert("Sesión cerrada por inactividad");
      cerrarSesion();
    }
  }, TIEMPO_LIMITE);
}

// Configurar eventos para detectar actividad del usuario
function configurarDeteccionActividad() {
  // Lista de eventos que reinician el temporizador
  const eventos = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
  
  // Agregar listeners para cada evento
  eventos.forEach(function(evento) {
    document.addEventListener(evento, reiniciarTemporizador, true);
  });
}

// Iniciar el control de inactividad si estamos en una página que requiere sesión
function iniciarControlInactividad() {
  if (getCookie("sesionActiva")) {
    configurarDeteccionActividad();
    reiniciarTemporizador();
  }
}