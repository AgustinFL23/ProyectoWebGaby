function obtener_examenes() {
	fetch("../PHP/obtener_examenes.php")
	.then(response=>response.json())
	.then(data=>{
		const lista= document.getElementById('Examenes');
		data.examenes.forEach(
			item=>{
				const li=document.createElement('li');
				const a=document.createElement('a');
				const id=item.id;
				a.href=`Examen.html?id=${id}`;
				a.textContent=item.titulo;
				li.appendChild(a);
				lista.appendChild(li);
			});
	})
	.catch(error=> {
		console.error("Error al obtener examenes",error);
	});
}
function obtener_Preguntas(argument) {
	fetch("obte.php")
}
function aleatorizar_Preguntas(argument) {
	// body...
}
function mostrar_Preguntas(argument) {
	// body...
}
function enviar_Respuestas(argument) {
	// body...
}
function verificar_Si_Se_Realizo_antes(argument) {
	// body...
}