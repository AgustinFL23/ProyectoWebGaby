function Mostrar_Formulario() {
    const id=obtener_Id_Desde_URL();
    var iframe = document.querySelector(".frame-formularios-alumno"); //un iframe para mostrar los formularios
    console.log("../"+id);
    if (iframe) {
        iframe.src="../"+id;   
    }
    else{
        console.log("No se encontro el iframe");
    }

}