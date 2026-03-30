// Inicializar datos si no existen
if (!localStorage.getItem("activos")) {
    guardarActivos([]);
}

if (!localStorage.getItem("mantenimientos")) {
    guardarMantenimientos([]);
}

// Mostrar resumen
mostrarResumen();

function mostrarResumen() {
    const activos = obtenerActivos();
    const mantenimientos = obtenerMantenimientos();

    document.getElementById("totalActivos").textContent = activos.length;

    const pendientes = mantenimientos.filter(m => m.estado === "pendiente").length;
    const enProceso = mantenimientos.filter(m => m.estado === "en proceso").length;
    const finalizados = mantenimientos.filter(m => m.estado === "finalizado").length;

    document.getElementById("pendientes").textContent = pendientes;
    document.getElementById("enProceso").textContent = enProceso;
    document.getElementById("finalizados").textContent = finalizados;
}