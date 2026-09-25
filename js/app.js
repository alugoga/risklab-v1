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

    } catch (error) {

        console.error(
            "RISK LAB: error",
            error
        );

        const statusText =
            document.querySelector(
                ".sidebar-bottom .system-status span:last-child"
            );

        if (statusText) {
            statusText.textContent =
                "DATA ERROR";
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

});
// ==========================================
// NAVEGACIÓN ENTRE VISTAS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navItems =
            document.querySelectorAll(
                ".nav-item[data-view]"
            );

        const views =
            document.querySelectorAll(
                ".view"
            );


        console.log(
            "RISK LAB: navegación inicializada",
            navItems.length,
            "menús /",
            views.length,
            "vistas"
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
                            "RISK LAB: CLICK",
                            targetView
                        );


                        // --------------------------
                        // Menú activo
                        // --------------------------

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


                        // --------------------------
                        // Ocultar vistas
                        // --------------------------

                        views.forEach(
                            function (view) {

                                view.hidden = true;

                            }
                        );


                        // --------------------------
                        // Mostrar vista seleccionada
                        // --------------------------

                        const selectedView =
                            document.getElementById(
                                "view-" + targetView
                            );


                        if (selectedView) {

                            selectedView.hidden =
                                false;

                        }

                    }
                );

            }
        );

    }
);
