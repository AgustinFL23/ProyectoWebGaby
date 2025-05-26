<<<<<<< HEAD
function obtener_examenes() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
function obtener_examenes(arg) {
>>>>>>> be62e51 (falta añadir lo de los examenes correctamente revisar el js correspondiente)
	fetch("../Comun/PHP/obtener_examenes.php")
=======
	fetch("../PHP/obtener_examenes.php")
>>>>>>> d57b4bf (sigamos)
=======
	fetch("Comun/PHP/obtener_examenes.php")
>>>>>>> 4da2a5b (Alumno funcional)
=======
	fetch("../Comun/PHP/obtener_examenes.php")
>>>>>>> 08bef71 (La verdad no reuerdo que hice aqui)
	.then(response=>response.json())
	.then(data=>{
        const cadena='Examenes'+String(arg);
        console.log(cadena);
		const lista= document.getElementById(`Examenes${arg}`);
		data.examenes.forEach(
			item=>{
				const li=document.createElement('li');
				const a=document.createElement('a');
				const id=item.id;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				a.href=`Examen?id=${id}`;
=======
				a.href=`Examen.html?id=${id}`;
>>>>>>> d57b4bf (sigamos)
=======
				a.href=`Examen?id=${id}`;
>>>>>>> 4da2a5b (Alumno funcional)
=======
				a.href=`?id=${id}`;
>>>>>>> 98ca4ed (bug arreglado)
				a.textContent=item.titulo;
				li.appendChild(a);
				lista.appendChild(li);
			});
	})
	.catch(error=> {
		console.error("Error al obtener examenes",error);
	});
}
function obtener_Id_Examen_Desde_URL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
function obtener_Preguntas() {
	const id=obtener_Id_Examen_Desde_URL();
<<<<<<< HEAD
<<<<<<< HEAD
	fetch(`PHP/obtener_preguntas_por_examen.php?id=${id}`)
=======
	fetch(`../PHP/obtener_preguntas_por_examen.php?id=${id}`)
>>>>>>> d57b4bf (sigamos)
=======
	fetch(`PHP/obtener_preguntas_por_examen.php?id=${id}`)
>>>>>>> 4da2a5b (Alumno funcional)
	.then(response=>response.json())
	.then(data=>{
		if (data.error) {
			alert(data.error);
		}
		else{
			document.getElementsByTagName("title").textContent=data.examen.titulo;
			const preguntasAleatorias = aleatorizar_Preguntas(data.preguntas);
			console.log(data.examen.preguntas_por_alumno);
            mostrar_Preguntas(preguntasAleatorias,data.examen.preguntas_por_alumno);
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
            { texto: p.opcion1, id: 1 },
            { texto: p.opcion2, id: 2 },
            { texto: p.opcion3, id: 3 },
            { texto: p.opcion4, id: 4 },
        ];

        const opciones_aleatorias = opciones.sort(() => Math.random() - 0.5);

        return {
            id: p.id,
            enunciado: p.enunciado,
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
                radio.name = `pregunta_${pregunta.id}`;
                radio.value = opcion.id;
                radio.id = `respuesta_${pregunta.id}_${opcion.id}`;

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
    boton.setAttribute('onclick', 'enviar_Respuestas(event)');

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
}

function verificar_Si_Se_Realizo_antes(argument) {
	// body...
}