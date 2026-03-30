mostrarAlertas();

function mostrarAlertas() {
    const lista = document.getElementById("listaAlertas");

    const mantenimientos = obtenerMantenimientos();
    const activos = obtenerActivos();

    lista.innerHTML = "";

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    mantenimientos.forEach(m => {

        const activo = activos.find(a => a.id == m.activoId);

        let fechaBase = new Date(m.fechaFin);

        // 🔥 usar frecuencia
        if (m.frecuencia) {
            fechaBase.setDate(fechaBase.getDate() + m.frecuencia);
        }

        fechaBase.setHours(0, 0, 0, 0);

        const diferencia = (fechaBase - hoy) / (1000 * 60 * 60 * 24);

        let estadoAlerta = "";
        let color = "";

        if (diferencia < 0 && m.estado !== "finalizado") {
            estadoAlerta = "VENCIDO";
            color = "table-danger";
        } else if (diferencia <= 3 && m.estado !== "finalizado") {
            estadoAlerta = "PRÓXIMO";
            color = "table-warning";
        } else {
            estadoAlerta = "AL DÍA";
            color = "table-success";
        }

        const fila = document.createElement("tr");
        fila.className = color;

        fila.innerHTML = `
            <td>${activo ? activo.nombre : "N/A"}</td>
            <td>${m.descripcion}</td>
            <td>${estadoAlerta}</td>
            <td>${fechaBase.toISOString().split("T")[0]}</td>
        `;

        lista.appendChild(fila);
    });
}