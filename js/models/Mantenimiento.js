// Clase para los mantenimientos
class Mantenimiento {
    constructor(id, activoId, tipoActivo, descripcion, fechaInicio, fechaFin, estado, frecuencia) {
        this.id = id;
        this.activoId = activoId; // relación con el activo
        this.tipoActivo = tipoActivo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado; // pendiente, en proceso, finalizado
        this.frecuencia = frecuencia;
    }
}