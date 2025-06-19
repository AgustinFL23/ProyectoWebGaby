function obtener_examenes(arg) {
	fetch("../Comun/PHP/obtener_examenes.php")
	.then(response=>response.json())
	.then(data=>{
        const cadena='Examenes'+String(arg);
        console.log(cadena);
		const lista= document.getElementById(`Examenes${arg}`);
		data.examenes.forEach(
			item=>{
                if (item.bloque.id_bloque==arg) {
                    const li=document.createElement('li');
                    const a=document.createElement('a');
                    const id=item.id_examen;
                    alert(id);
                    a.href=`../Examen/?id=${id}`;
                    a.textContent=item.nombreExamen;
                    li.appendChild(a);
                    lista.appendChild(li);
                }
				
			});
	})
	.catch(error=> {
		console.error("Error al obtener examenes",error);
	});
}
function obtener_Id_Desde_URL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function enviar_Respuestas() {
    console.log("Intentando enviar respuestas...");
    const id_examen = obtener_Id_Desde_URL();
    const respuestas = {};
    const radios = document.querySelectorAll("input[type=radio]:checked");

    if (radios.length === 0) {
        alert("Por favor responde al menos una pregunta.");
        return;
    }

    radios.forEach(radio => {
        const name = radio.name; // ejemplo: pregunta_12
        const id_pregunta = name.split("_")[1];
        respuestas[id_pregunta] = radio.value; // valor es 1, 2, 3 o 4
    });

    console.log("Respuestas:", respuestas);

    fetch("../Comun/PHP/guardar_respuestas.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_examen, respuestas })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Tu calificación es: ${data.calificacion}`);
            document.getElementById("submitBtn").disabled = true;
        } else {
            alert("Error en servidor: " + data.error);
        }
    })
    .catch(error => {
        console.error("Error al enviar respuestas:", error);
        alert("Error de red al enviar el examen");
    });
}
function verificar_Si_Se_Realizo_antes(argument) {
	// body..
}

function obtener_videos(arg) {
    fetch("../Comun/PHP/obtener_video.php")
    .then(response=>response.json())
    .then(data=>{
        const cadena='Video'+String(arg);
        console.log(cadena);
        const lista= document.getElementById(`Video${arg}`);
        data.videos.forEach(
            item=>{
                if (item.bloque.id_bloque==arg) {
                    const li=document.createElement('li');
                    const a=document.createElement('a');
                    const id=item.direccion;
                    alert(id);
                    a.href=`../Videos/?id=${id}`;
                    a.textContent=item.contenido.tema;
                    li.appendChild(a);
                    lista.appendChild(li);
                }
                
            });
    })
    .catch(error=> {
        console.error("Error al obtener examenes",error);
    });
}
function obtener_libros(arg) {
    fetch("../Comun/PHP/obtener_libros.php")
    .then(response=>response.json())
    .then(data=>{
        const cadena='Video'+String(arg);
        console.log(cadena);
        const lista= document.getElementById(`Libros${arg}`);
        data.libros.forEach(
            item=>{
                if (item.bloque.id_bloque==arg) {
                    const li=document.createElement('li');
                    const a=document.createElement('a');
                    const id=item.direccion;
                    alert(id);
                    a.href=`../Libros/?id=${id}`;
                    a.textContent=item.contenido.tema;
                    li.appendChild(a);
                    lista.appendChild(li);
                }
                
            });
    })
    .catch(error=> {
        console.error("Error al obtener examenes",error);
    });
}
function obtener_imprimibles(arg) {
    fetch("../Comun/PHP/obtener_imprimibles.php")
    .then(response=>response.json())
    .then(data=>{
        const cadena='Video'+String(arg);
        console.log(cadena);
        const lista= document.getElementById(`Imprimibles${arg}`);
        data.diapositivas.forEach(
            item=>{
                if (item.bloque.id_bloque==arg) {
                    const li=document.createElement('li');
                    const a=document.createElement('a');
                    const id=item.direccion;
                    alert(id);
                    a.href=`../Imprimibles/?id=${id}`;
                    a.textContent=item.contenido.tema;
                    li.appendChild(a);
                    lista.appendChild(li);
                }
                
            });
    })
    .catch(error=> {
        console.error("Error al obtener examenes",error);
    });
}
function obtener_Preguntas() {
    const id=obtener_Id_Desde_URL();
    fetch(`PHP/obtener_preguntas_por_examen.php?id=${id}`)
    .then(response=>response.json())
    .then(data=>{
        if (data.error) {
            alert(data.error);
        }
        else{
            document.getElementsByTagName("title").textContent=data.examen.titulo;
            const preguntasAleatorias = aleatorizar_Preguntas(data.preguntas);
            console.log(data.examen.cantidad_preguntas);
            mostrar_Preguntas(preguntasAleatorias,data.examen.cantidad_preguntas);
        }

    })
    .catch(error => {
       console.error("Error al obtener el examen:", error);
    });
}
function aleatorizar_Preguntas(preguntas) {
    preguntas = preguntas.sort(() => Math.random() - 0.5);
    return preguntas.map(p => {
        const opciones = [
            { texto: p.opcionA, id: 1 },
            { texto: p.opcionB, id: 2 },
            { texto: p.opcionC, id: 3 },
            { texto: p.opcionD, id: 4 },
        ];

        const opciones_aleatorias = opciones.sort(() => Math.random() - 0.5);

        return {
            id: p.id,
            enunciado: p.pregunta,
            opciones: opciones_aleatorias
        };
    });

}
function mostrar_Preguntas(preguntas, size) {
    const formulario = document.getElementById("Cuestionario");

    preguntas.forEach((pregunta, index) => {
        if (index < size) {
            const fieldset = document.createElement("fieldset");
            const legend = document.createElement("legend");
            legend.textContent = `Pregunta ${index + 1}: ${pregunta.enunciado}`;
            fieldset.appendChild(legend);

            pregunta.opciones.forEach(opcion => {
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `pregunta_${preguntas.id_pregunta}`;
                radio.value = opcion.id;
                radio.id = `respuesta_${preguntas.id_pregunta}_${opcion.id_}`;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(" " + opcion.texto));
                fieldset.appendChild(label);
                fieldset.appendChild(document.createElement("br"));
            });

            formulario.appendChild(fieldset);
        }
    });

   const boton = document.createElement("button");
boton.type = "button";
boton.className = "continue-application";
boton.id = "submitBtn";

boton.innerHTML = `
    <div>
        <div class="pencil"></div>
        <div class="folder">
            <div class="top">
                <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                </svg>
            </div>
            <div class="paper"></div>
        </div>
    </div>
    <span class="content">
        Mandar Respuestas
        <span class="checkmark">
            <svg viewBox="0 0 24 24">
                <polyline points="4 12 10 17 20 7" />
            </svg>
        </span>
    </span>
`;

formulario.appendChild(boton);

// Animación + llamada a enviar_Respuestas
const btn = document.getElementById("submitBtn");
const content = btn.querySelector(".content");
const originalHTML = content.innerHTML;

btn.addEventListener("click", (event) => {
    if (btn.disabled) return;

    btn.classList.add("sent");
    btn.disabled = true;
    content.style.opacity = 0;

    setTimeout(() => {
        content.innerHTML = 'Enviado <span class="checkmark"><svg viewBox="0 0 24 24"><polyline points="4 12 10 17 20 7" /></svg></span>';
        content.style.opacity = 1;

        // Aquí se ejecuta el envío al backend después de la animación
        enviar_Respuestas();
    }, 800);

    // Reset del botón después de 3.5s
    setTimeout(() => {
        btn.classList.remove("sent");
        content.style.opacity = 0;

        setTimeout(() => {
            content.innerHTML = originalHTML;
            content.style.opacity = 1;
            btn.disabled = false;
        }, 300);
    }, 3500);
});
}
