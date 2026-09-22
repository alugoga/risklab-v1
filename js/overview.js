function formatoNumero(valor, decimales = 2) {
    return Number(valor).toLocaleString("es-MX", {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    });
}


function formatoPorcentaje(valor, decimales = 4) {
    return `${formatoNumero(valor, decimales)}%`;
}


function calcularUtilizacion(varActual, limite) {
    return (varActual / limite) * 100;
}


function calcularCambio(actual, anterior) {

    if (
        anterior === null ||
        anterior === undefined ||
        anterior === 0
    ) {
        return null;
    }

    return ((actual - anterior) / anterior) * 100;
}


function renderOverview(data) {

    /* =====================================================
       ENCABEZADO
    ===================================================== */

    const fecha = new Date(data.fecha + "T00:00:00");

    document.getElementById("overview-date").textContent =
        fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).toUpperCase();


    /* =====================================================
       MÉTRICAS PRINCIPALES
    ===================================================== */

    document.getElementById("valor-mercado").textContent =
        formatoNumero(data.cartera.valorMercado);

    document.getElementById("valor-mercado-secondary").textContent =
        "Cierre " + data.periodo;


    document.getElementById("var").textContent =
        formatoNumero(data.riesgo.var);


    document.getElementById("var-mdp").textContent =
        `$${formatoNumero(data.riesgo.varMdp)} MDP`;


    document.getElementById("volatilidad").textContent =
        formatoNumero(data.cartera.volatilidad);


    document.getElementById("cvar").textContent =
        formatoNumero(data.riesgo.cvar);


    document.getElementById("cvar-mdp").textContent =
        `$${formatoNumero(data.riesgo.cvarMdp)} MDP`;


    /* =====================================================
       MÉTRICAS SECUNDARIAS
    ===================================================== */

    document.getElementById("monto-inversion").textContent =
        formatoNumero(data.cartera.montoInversion);


    document.getElementById("duracion").textContent =
        formatoNumero(data.cartera.duracion, 4);


    document.getElementById("convexidad").textContent =
        formatoNumero(data.cartera.convexidad, 4);


    /* =====================================================
       RISK LIMIT
    ===================================================== */

    const utilizacion = calcularUtilizacion(
        data.riesgo.var,
        data.riesgo.limiteVar
    );


    document.getElementById("risk-current").textContent =
        formatoPorcentaje(data.riesgo.var);


    document.getElementById("risk-limit").textContent =
        formatoPorcentaje(data.riesgo.limiteVar);


    document.getElementById("risk-utilization").textContent =
        `UTILIZACIÓN ${formatoNumero(utilizacion, 2)}%`;


    document.getElementById("risk-limit-footer").textContent =
        `${formatoNumero(data.riesgo.limiteVar, 2)}%`;


    document.getElementById("risk-progress").style.width =
        `${Math.min(utilizacion, 100)}%`;


    /* =====================================================
       MARKET PULSE
    ===================================================== */

    const cambioVM = calcularCambio(
        data.cartera.valorMercado,
        data.anterior.valorMercado
    );


    const cambioVol = calcularCambio(
        data.cartera.volatilidad,
        data.anterior.volatilidad
    );


    const cambioDuracion = calcularCambio(
        data.cartera.duracion,
        data.anterior.duracion
    );


    const cambioConvexidad = calcularCambio(
        data.cartera.convexidad,
        data.anterior.convexidad
    );


    /* -----------------------------------------------------
       Valores actuales
    ----------------------------------------------------- */

    document.getElementById("pulse-vm").textContent =
        `${formatoNumero(data.cartera.valorMercado)} MDP`;


    document.getElementById("pulse-vol").textContent =
        `${formatoPorcentaje(data.cartera.volatilidad)}`;


    document.getElementById("pulse-duration").textContent =
        formatoNumero(data.cartera.duracion, 4);


    document.getElementById("pulse-convexity").textContent =
        formatoNumero(data.cartera.convexidad, 4);


    /* -----------------------------------------------------
       Cambios
    ----------------------------------------------------- */

    actualizarCambio(
        "pulse-vm-change",
        cambioVM
    );


    actualizarCambio(
        "pulse-vol-change",
        cambioVol
    );


    actualizarCambio(
        "pulse-duration-change",
        cambioDuracion
    );


    actualizarCambio(
        "pulse-convexity-change",
        cambioConvexidad
    );


    /* -----------------------------------------------------
       Consola
    ----------------------------------------------------- */

    console.log(
        "Utilización VaR:",
        formatoNumero(utilizacion, 2) + "%"
    );

}


/* =========================================================
   ACTUALIZAR CAMBIO
========================================================= */

function actualizarCambio(elementId, cambio) {

    const elemento = document.getElementById(elementId);

    if (!elemento) {
        console.warn(
            `No existe el elemento #${elementId}`
        );

        return;
    }


    if (cambio === null) {

        elemento.textContent = "—";

        elemento.classList.remove(
            "positive",
            "negative",
            "neutral"
        );

        elemento.classList.add("neutral");

        return;
    }


    const signo = cambio > 0 ? "+" : "";


    elemento.textContent =
        `${signo}${formatoNumero(cambio, 2)}%`;


    elemento.classList.remove(
        "positive",
        "negative",
        "neutral"
    );


    if (cambio > 0) {

        elemento.classList.add("positive");

    } else if (cambio < 0) {

        elemento.classList.add("negative");

    } else {

        elemento.classList.add("neutral");

    }

}
