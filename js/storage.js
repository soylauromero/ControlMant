// Función para obtener activos guardados
function obtenerActivos() {
    const activos = localStorage.getItem("activos");
    return activos ? JSON.parse(activos) : [];
}

// Función para guardar activos
function guardarActivos(activos) {
    localStorage.setItem("activos", JSON.stringify(activos));
}

// Función para obtener mantenimientos guardados
function obtenerMantenimientos() {
    const mantenimientos = localStorage.getItem("mantenimientos");
    return mantenimientos ? JSON.parse(mantenimientos) : [];
}

// Función para guardar mantenimientos
function guardarMantenimientos(mantenimientos) {
    localStorage.setItem("mantenimientos", JSON.stringify(mantenimientos));
}