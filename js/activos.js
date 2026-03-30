// Obtener elementos del DOM
const form = document.getElementById("formActivo");
const lista = document.getElementById("listaActivos");

// Cargar activos al iniciar
mostrarActivos();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const nombre = document.getElementById("nombre").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const tipoMaquina = document.getElementById("tipoMaquina").value.trim();
    const estado = document.getElementById("estado").value.trim();
    const observaciones = document.getElementById("observaciones").value.trim();

    if (nombre === "" || estado === "") {
        alert("Nombre y estado son obligatorios");
        return;
    }

    if (tipo === "canal" && ubicacion === "") {
        alert("La ubicación es obligatoria para canal");
        return;
    }

    if (tipo === "maquinaria" && tipoMaquina === "") {
        alert("El tipo de máquina es obligatorio");
        return;
    }

    let activos = obtenerActivos();
    const id = Date.now();

    let nuevo;

    if (tipo === "canal") {
        nuevo = new Canal(id, nombre, ubicacion, estado, observaciones);
    } else {
        nuevo = new Maquinaria(id, nombre, tipoMaquina, estado, observaciones);
    }

    activos.push(nuevo);
    guardarActivos(activos);

    form.reset();
    mostrarActivos();
});

// Mostrar activos en pantalla
function mostrarActivos() {
    const activos = obtenerActivos();

    lista.innerHTML = "";

    if (activos.length === 0) {
        lista.innerHTML = "<tr><td colspan='5'>No hay activos</td></tr>";
        return;
    }

    activos.forEach(activo => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${activo.tipo}</td>
            <td>${activo.nombre}</td>
            <td>${activo.tipo === "canal" ? activo.ubicacion : activo.tipoMaquina}</td>
            <td>${activo.estado}</td>
            <td>${activo.observaciones}</td>
        `;

        lista.appendChild(fila);
    });
}