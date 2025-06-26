// Variables globales
let temas = [];
let archivosPorTema = {};

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario
    if(typeof getCookie === 'function') {
        document.getElementById("username-display").textContent = getCookie("username") || "Profesor";
        document.getElementById("tipo-usuario-display").textContent = getCookie("tipoUsuario") || "Docente";
    }

    // Cargar temas y archivos existentes
    cargarTemas();
    
    // Configurar eventos
    document.getElementById('btn-nuevo-tema').addEventListener('click', mostrarFormularioTema);
    document.getElementById('btn-guardar-tema').addEventListener('click', guardarTema);
    document.getElementById('btn-cancelar-tema').addEventListener('click', ocultarFormularioTema);
    document.getElementById('btn-subir').addEventListener('click', () => document.getElementById('subir-archivo').click());
    document.getElementById('subir-archivo').addEventListener('change', subirArchivo);
    document.getElementById('lista-temas').addEventListener('change', cargarArchivosTema);
});

async function cargarTemas() {
    try {
        // Simulación: En una implementación real, esto haría una petición al servidor
        const response = await fetch('../Materiales/temas.json');
        temas = await response.json();
        
        const select = document.getElementById('lista-temas');
        select.innerHTML = '<option value="">-- Seleccione un tema --</option>';
        
        temas.forEach(tema => {
            const option = document.createElement('option');
            option.value = tema.id;
            option.textContent = tema.nombre;
            select.appendChild(option);
            
            // Cargar estructura de archivos por tema
            archivosPorTema[tema.id] = tema.archivos || [];
        });
    } catch (error) {
        console.error("Error cargando temas:", error);
        // Si no existe el archivo, creamos uno básico
        temas = [
            { id: 'matematicas', nombre: 'Matemáticas', archivos: [] },
            { id: 'ciencias', nombre: 'Ciencias', archivos: [] },
            { id: 'espanol', nombre: 'Español', archivos: [] }
        ];
        actualizarTemas();
    }
}

function actualizarTemas() {
    // Guardar cambios en el "servidor" (simulado)
    const data = JSON.stringify(temas, null, 2);
    localStorage.setItem('temasData', data);
}

function mostrarFormularioTema() {
    document.getElementById('nuevo-tema-form').style.display = 'block';
    document.getElementById('btn-nuevo-tema').style.display = 'none';
}

function ocultarFormularioTema() {
    document.getElementById('nuevo-tema-form').style.display = 'none';
    document.getElementById('btn-nuevo-tema').style.display = 'inline-block';
    document.getElementById('nombre-tema').value = '';
}

function guardarTema() {
    const nombreTema = document.getElementById('nombre-tema').value.trim();
    if (!nombreTema) return;
    
    const nuevoTema = {
        id: nombreTema.toLowerCase().replace(/\s+/g, '-'),
        nombre: nombreTema,
        archivos: []
    };
    
    temas.push(nuevoTema);
    archivosPorTema[nuevoTema.id] = [];
    
    // Actualizar la lista desplegable
    const select = document.getElementById('lista-temas');
    const option = document.createElement('option');
    option.value = nuevoTema.id;
    option.textContent = nuevoTema.nombre;
    select.appendChild(option);
    
    // Seleccionar el nuevo tema
    select.value = nuevoTema.id;
    
    // Guardar cambios y limpiar formulario
    actualizarTemas();
    ocultarFormularioTema();
    
    // Crear carpeta para el tema (simulado)
    console.log(`Creando carpeta: ../Materiales/${nuevoTema.id}/`);
}

function cargarArchivosTema() {
    const temaId = document.getElementById('lista-temas').value;
    const listaArchivos = document.getElementById('lista-archivos');
    
    if (!temaId) {
        listaArchivos.innerHTML = '<p>Seleccione un tema para ver sus materiales</p>';
        document.getElementById('visor-pdf').style.display = 'none';
        return;
    }
    
    listaArchivos.innerHTML = '';
    
    if (archivosPorTema[temaId] && archivosPorTema[temaId].length > 0) {
        archivosPorTema[temaId].forEach(archivo => {
            const item = document.createElement('div');
            item.className = 'archivo-item';
            
            item.innerHTML = `
                <span>${archivo.nombre}</span>
                <div>
                    <button class="boton-accion boton-ver" onclick="verArchivo('${temaId}', '${archivo.nombre}')">Ver</button>
                    <button class="boton-accion boton-eliminar" onclick="eliminarArchivo('${temaId}', '${archivo.nombre}')">Eliminar</button>
                </div>
            `;
            
            listaArchivos.appendChild(item);
        });
    } else {
        listaArchivos.innerHTML = '<p>No hay materiales disponibles para este tema</p>';
    }
}

function verArchivo(temaId, nombreArchivo) {
    const visor = document.getElementById('visor-pdf');
    // En producción, esto apuntaría a la ruta real del archivo
    visor.src = `../Materiales/${temaId}/${encodeURIComponent(nombreArchivo)}`;
    visor.style.display = 'block';
}

async function subirArchivo(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const temaId = document.getElementById('lista-temas').value;
    if (!temaId) {
        alert('Por favor seleccione un tema primero');
        return;
    }
    
    if (!file.name.endsWith('.pdf')) {
        alert('Solo se permiten archivos PDF');
        return;
    }
    
    // Mostrar progreso
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.getElementById('barra-progreso');
    const mensaje = document.getElementById('mensaje-subida');
    
    progressBar.style.display = 'block';
    progress.style.width = '0%';
    mensaje.textContent = 'Subiendo archivo...';
    
    // Simulación de subida (en producción sería una petición real al servidor)
    await new Promise(resolve => {
        let progressValue = 0;
        const interval = setInterval(() => {
            progressValue += 10;
            progress.style.width = `${progressValue}%`;
            
            if (progressValue >= 100) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
    
    // Guardar referencia al archivo
    const nuevoArchivo = {
        nombre: file.name,
        fecha: new Date().toISOString(),
        tamaño: file.size
    };
    
    archivosPorTema[temaId].push(nuevoArchivo);
    
    // Actualizar la lista de temas
    const tema = temas.find(t => t.id === temaId);
    if (tema) {
        tema.archivos = archivosPorTema[temaId];
    }
    
    actualizarTemas();
    cargarArchivosTema();
    
    mensaje.textContent = `Archivo "${file.name}" subido correctamente al tema "${tema.nombre}"`;
    progressBar.style.display = 'none';
    
    // Simular guardado en carpeta
    console.log(`Guardando archivo en: ../Materiales/${temaId}/${file.name}`);
}

function eliminarArchivo(temaId, nombreArchivo) {
    if (!confirm(`¿Está seguro de eliminar "${nombreArchivo}"?`)) return;
    
    archivosPorTema[temaId] = archivosPorTema[temaId].filter(a => a.nombre !== nombreArchivo);
    
    // Actualizar la lista de temas
    const tema = temas.find(t => t.id === temaId);
    if (tema) {
        tema.archivos = archivosPorTema[temaId];
    }
    
    actualizarTemas();
    cargarArchivosTema();
    
    // Simular eliminación de archivo físico
    console.log(`Eliminando archivo de: ../Materiales/${temaId}/${nombreArchivo}`);
}