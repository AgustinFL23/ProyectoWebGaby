function obtener_examenes() {
	fetch("Comun/PHP/obtener_examenes.php")
	.then(response=>response.json())
	.then(data=>{
		const lista= document.getElementById('Examenes');
		data.examenes.forEach(
			item=>{
				const li=document.createElement('li');
				const a=document.createElement('a');
				const id=item.id;
				a.href=`Examen?id=${id}`;
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
	fetch(`PHP/obtener_preguntas_por_examen.php?id=${id}`)
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
function mostrar_Preguntas(preguntas,size) {
	const formulario = document.getElementById("Cuestionario");

    preguntas.forEach((pregunta, index) => {
    	if (index<size) {
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
    boton.type = "submit";
    boton.textContent = "Enviar respuestas";
    formulario.appendChild(boton);
}
function enviar_Respuestas(argument) {
	// body...
}
function verificar_Si_Se_Realizo_antes(argument) {
	// body...
}