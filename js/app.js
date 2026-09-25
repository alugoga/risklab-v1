document.addEventListener("DOMContentLoaded", async function () {

    console.log("RISK LAB: DOM cargado");

    try {

        console.log(
            "RISK LAB: cargando datos..."
        );

        const data =
            await cargarDatos();


        console.log(
            "RISK LAB: datos recibidos",
            data
        );


        console.log(
            "RISK LAB: cargando histórico..."
        );

        const historico =
            await cargarHistorico();


        console.log(
            "RISK LAB: histórico recibido",
            historico
        );


        renderOverview(data);


        const historicoPreparado =
            prepararHistorico(
                historico
            );


        console.log(
            "RISK LAB: histórico preparado",
            historicoPreparado
        );

        renderMarketValueChart(
            historico
        );

        renderRiskProfileChart(
            historico
        );

        console.log(
            "RISK LAB: dashboard renderizado"
        );

// ==========================================
// NAVEGACIÓN ENTRE VISTAS
// ==========================================

const navItems =
    document.querySelectorAll(
        ".nav-item[data-view]"
    );

const views =
    document.querySelectorAll(
        ".view"
    );


navItems.forEach(
    function (navItem) {

        navItem.addEventListener(
            "click",
            function () {

                const targetView =
                    navItem.getAttribute(
                        "data-view"
                    );


                console.log(
                    "CLICK NAV:",
                    navItem.textContent.trim(),
                    targetView
                );


                // ------------------------------
                // Actualizar menú
                // ------------------------------

                navItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                navItem.classList.add(
                    "active"
                );


                // ------------------------------
                // Ocultar todas las vistas
                // ------------------------------

                views.forEach(
                    function (view) {

                        view.hidden = true;

                    }
                );


                // ------------------------------
                // Mostrar vista seleccionada
                // ------------------------------

                const selectedView =
                    document.getElementById(
                        "view-" + targetView
                    );


                if (selectedView) {

                    selectedView.hidden = false;

                }

            }
        );

    }
);
