// Clase que hereda de Activo
class Canal extends Activo {
    constructor(id, nombre, ubicacion, estado, observaciones) {
        super(id, "canal", nombre, estado, observaciones);
        this.ubicacion = ubicacion;
    }
}