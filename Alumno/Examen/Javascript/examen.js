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