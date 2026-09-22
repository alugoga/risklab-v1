document.addEventListener("DOMContentLoaded", async () => {

```
console.log("=================================");
console.log("RISK LAB");
console.log("DOM cargado");
console.log("=================================");

try {

    console.log("Intentando cargar overview.json...");

    const data = await cargarDatos();

    console.log("JSON cargado correctamente:");
    console.log(data);

    renderOverview(data);

    console.log("Dashboard renderizado correctamente.");

} catch (error) {

    console.error(
        "ERROR INICIANDO RISK LAB:",
        error
    );

    const statusText =
        document.querySelector(
            ".sidebar-bottom .system-status span:last-child"
        );

    if (statusText) {
        statusText.textContent = "DATA ERROR";
    }

    const statusDot =
        document.querySelector(
            ".sidebar-bottom .status-dot"
        );

    if (statusDot) {

        statusDot.style.background =
            "#ef6b73";

        statusDot.style.boxShadow =
            "0 0 7px rgba(239, 107, 115, .45)";
    }

}
```

});
