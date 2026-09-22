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
    if (!anterior || anterior === 0) return null;

    return ((actual - anterior) / anterior) * 100;
}


function renderOverview(data) {

    // -----------------------------
    // ENCABEZADO
    // -----------------------------

    const fecha = new Date(data.fecha + "T00:00:00");

    document.getElementById("overview-date").textContent =
        fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).toUpperCase();


    // -----------------------------
    // MÉTRICAS PRINCIPALES
    // -----------------------------

    document.getElementById("valor-mercado").textContent =
        `$${formatoNumero(data.cartera.valorMercado)} MDP`;

    document.getElementById("var").textContent =
        formatoPorcentaje(data.riesgo.var);

    document.getElementById("var-mdp").textContent =
        `$${formatoNumero(data.riesgo.varMdp)} MDP`;

    document.getElementById("volatilidad").textContent =
        formatoPorcentaje(data.cartera.volatilidad);

    document.getElementById("cvar").textContent =
        formatoPorcentaje(data.riesgo.cvar);

    document.getElementById("cvar-mdp").textContent =
        `$${formatoNumero(data.riesgo.cvarMdp)} MDP`;


    // -----------------------------
    // MÉTRICAS SECUNDARIAS
    // -----------------------------

    document.getElementById("monto-inversion").textContent =
        `$${formatoNumero(data.cartera.montoInversion)} MDP`;

    document.getElementById("duracion").textContent =
        formatoNumero(data.cartera.duracion, 4);

    document.getElementById("convexidad").textContent =
        formatoNumero(data.cartera.convexidad, 4);


    // -----------------------------
    // LÍMITE VaR
    // -----------------------------

    const utilizacion = calcularUtilizacion(
        data.riesgo.var,
        data.riesgo.limiteVar
    );

    document.getElementById("var-limit-current").textContent =
        formatoPorcentaje(data.riesgo.var);

    document.getElementById("var-limit").textContent =
        formatoPorcentaje(data.riesgo.limiteVar);

    document.getElementById("var-utilization").textContent =
        `${formatoNumero(utilizacion, 1)}%`;

    document.getElementById("var-progress").style.width =
        `${Math.min(utilizacion, 100)}%`;


    // -----------------------------
    // MARKET PULSE
    // -----------------------------

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

    actualizarCambio("change-vm", cambioVM);
    actualizarCambio("change-vol", cambioVol);
    actualizarCambio("change-duration", cambioDuracion);
}


function actualizarCambio(elementId, cambio) {

    const elemento = document.getElementById(elementId);

    if (cambio === null) {
        elemento.textContent = "—";
        return;
    }

    const signo = cambio > 0 ? "+" : "";

    elemento.textContent =
        `${signo}${formatoNumero(cambio, 2)}%`;

    elemento.classList.remove("positive", "negative", "neutral");

    if (cambio > 0) {
        elemento.classList.add("positive");
    } else if (cambio < 0) {
        elemento.classList.add("negative");
    } else {
        elemento.classList.add("neutral");
    }
}
