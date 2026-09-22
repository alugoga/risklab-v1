document.addEventListener("DOMContentLoaded", async () => {

    try {

        const data = await cargarDatos();

        renderOverview(data);

        console.log("Risk Lab iniciado correctamente.");
        console.log("Datos:", data);

    } catch (error) {

        console.error("Error iniciando Risk Lab:", error);

        const status = document.getElementById("system-status");

        if (status) {
            status.textContent = "DATA ERROR";
            status.classList.add("error");
        }
    }

});
