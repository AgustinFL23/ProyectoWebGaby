function obtener_temas() {
	fetch("../Comun/PHP/obtener_temas.php")
	.then(response=>response.json())
	.then(data=>{
        const cadena='lista-temas';
        console.log(cadena);
		const lista= document.getElementById(cadena);
		data.contenidos.forEach(
			item=>{
                const option=document.createElement('option');
                const id=item.id_contenido;
                option.textContent=item.tema;
                lista.appendChild(option);				
			});
	})
	.catch(error=> {
		console.error("Error al obtener temas",error);
	});
}