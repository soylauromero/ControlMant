// Clase base para cualquier activo
class Activo {
    constructor(id, tipo, nombre, estado, observaciones) {
        this.id = id;
        this.tipo = tipo; // canal o maquinaria
        this.nombre = nombre;
        this.estado = estado;
        this.observaciones = observaciones;
    }
}