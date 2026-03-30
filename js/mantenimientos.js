const form = document.getElementById("formMantenimiento");
const lista = document.getElementById("listaMantenimientos");
const selectActivo = document.getElementById("activoSelect");

cargarActivos();
mostrarMantenimientos();

let editandoId = null;

function cargarActivos() {
    const activos = obtenerActivos();
    selectActivo.innerHTML = "";

    activos.forEach(activo => {
        const option = document.createElement("option");
        option.value = activo.id;
        option.textContent = `${activo.nombre}`;
        selectActivo.appendChild(option);
    });
}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const activoId = selectActivo.value;
    const descripcion = document.getElementById("descripcion").value.trim();
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const estado = document.getElementById("estado").value;


    const frecuenciaInput = document.getElementById("frecuencia").value;
    const frecuencia = Number(frecuenciaInput);

    // VALIDACIONES
    if (!activoId || !descripcion || !fechaInicio || !fechaFin || frecuenciaInput === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (isNaN(frecuencia) || frecuencia <= 0) {
        alert("La frecuencia debe ser un número válido");
        return;
    }

    if (fechaFin < fechaInicio) {
        alert("La fecha fin no puede ser menor a la fecha inicio");
        return;
    }

    const activos = obtenerActivos();
    const activo = activos.find(a => a.id == activoId);

    let mantenimientos = obtenerMantenimientos();

    const nuevo = new Mantenimiento(
        Date.now(),
        activoId,
        activo.tipo,
        descripcion,
        fechaInicio,
        fechaFin,
        estado,
        frecuencia
    );

    if (editandoId) {
        const index = mantenimientos.findIndex(m => m.id === editandoId);

        if (index !== -1) {
            mantenimientos[index].descripcion = descripcion;
            mantenimientos[index].fechaInicio = fechaInicio;
            mantenimientos[index].fechaFin = fechaFin;
            mantenimientos[index].estado = estado;
        }

        editandoId = null;

    } else {
        mantenimientos.push(nuevo);
        guardarMantenimientos(mantenimientos);
    }

    form.reset();
    mostrarMantenimientos();
});
function parsearFecha(fechaTexto) {
    const partes = fechaTexto.split("-");
    return new Date(partes[0], partes[1] - 1, partes[2]);
}

function formatearFecha(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

function calcularProximaFecha(fechaFin, frecuencia) {
    const fecha = parsearFecha(fechaFin);
    fecha.setDate(fecha.getDate() + Number(frecuencia));
    return formatearFecha(fecha);
}

function mostrarMantenimientos() {
    const mantenimientos = obtenerMantenimientos();
    const activos = obtenerActivos();

    lista.innerHTML = "";

    if (mantenimientos.length === 0) {
        lista.innerHTML = "<tr><td colspan='7'>No hay mantenimientos</td></tr>";
        return;
    }

    mantenimientos.forEach(m => {
        const activo = activos.find(a => a.id == m.activoId);

        let proxima = "Sin calcular";
        if (m.frecuencia && m.fechaFin) {
            proxima = calcularProximaFecha(m.fechaFin, m.frecuencia);
        }

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${activo ? activo.nombre : "N/A"}</td>
            <td>${m.descripcion}</td>
            <td>${m.estado}</td>
            <td>${m.fechaFin}</td>
            <td>${Number(m.frecuencia)} días</td>
            <td>${proxima}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="cambiarEstado(${m.id})">Estado</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarMantenimiento(${m.id})">Eliminar</button>
            </td>
        `;

        lista.appendChild(fila);
    });
}

function cambiarEstado(id) {
    let mantenimientos = obtenerMantenimientos();

    mantenimientos = mantenimientos.map(m => {
        if (m.id === id) {
            if (m.estado === "pendiente") {
                m.estado = "en proceso";
            } else if (m.estado === "en proceso") {
                m.estado = "finalizado";
            } else {
                m.estado = "pendiente";
            }
        }
        return m;
    });

    guardarMantenimientos(mantenimientos);
    mostrarMantenimientos();
}

function eliminarMantenimiento(id) {
    let mantenimientos = obtenerMantenimientos();
    mantenimientos = mantenimientos.filter(m => m.id !== id);

    guardarMantenimientos(mantenimientos);
    mostrarMantenimientos();
}

function editarMantenimiento(id) {

    let mantenimientos = obtenerMantenimientos();
    const m = mantenimientos.find(m => m.id === id);

    if (!m) return;

    // Cargar datos en el formulario
    document.getElementById("descripcion").value = m.descripcion;
    document.getElementById("fechaInicio").value = m.fechaInicio;
    document.getElementById("fechaFin").value = m.fechaFin;
    document.getElementById("estado").value = m.estado;

    // Guardar ID en edición
    editandoId = id;
}

function filtrarMantenimientos() {
    const estado = document.getElementById("filtroEstado").value;

    const activos = obtenerActivos();
    let mantenimientos = obtenerMantenimientos();
    let filtrados = mantenimientos;

    if (estado !== "") {
        filtrados = mantenimientos.filter(m => m.estado === estado);
    }
    const contenedor = document.getElementById("listaMantenimientos");
    contenedor.innerHTML = "";

    filtrados.forEach(m => {
        const activo = activos.find(a => a.id == m.activoId);

        let proxima = "Sin calcular";
        if (m.frecuencia && m.fechaFin) {
            proxima = calcularProximaFecha(m.fechaFin, m.frecuencia);
        }

        const contenedor = document.createElement("tr");

        contenedor.innerHTML = `
            <td>${activo ? activo.nombre : "N/A"}</td>
            <td>${m.descripcion}</td>
            <td>${m.estado}</td>
            <td>${m.fechaFin}</td>
            <td>${Number(m.frecuencia)} días</td>
            <td>${proxima}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="cambiarEstado(${m.id})">Estado</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarMantenimiento(${m.id})">Eliminar</button>
            </td>
        `;

        lista.appendChild(contenedor);
    });


}

