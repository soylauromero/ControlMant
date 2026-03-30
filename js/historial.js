// Mostrar historial (solo finalizados)
mostrarHistorial();

function mostrarHistorial() {
    const lista = document.getElementById("listaHistorial");

    const mantenimientos = obtenerMantenimientos();
    const activos = obtenerActivos();

    const historial = mantenimientos.filter(m => m.estado === "finalizado");

    lista.innerHTML = "";

    if (historial.length === 0) {
        lista.innerHTML = "<tr><td colspan='3'>No hay historial</td></tr>";
        return;
    }

    historial.forEach(m => {

        const activo = activos.find(a => a.id == m.activoId);

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${activo ? activo.nombre : "Sin activo"}</td>
            <td>${m.descripcion}</td>
            <td>${m.fechaFin}</td>
        `;

        lista.appendChild(fila);
    });
}