// Clase que hereda de Activo
class Maquinaria extends Activo {
    constructor(id, nombre, tipoMaquina, estado, observaciones) {
        super(id, "maquinaria", nombre, estado, observaciones);
        this.tipoMaquina = tipoMaquina;
    }
}