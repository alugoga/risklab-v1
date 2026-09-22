const DATA_URL = "./data/overview.json";

async function cargarDatos() {
    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("No fue posible cargar los datos:", error);
        throw error;
    }
}
