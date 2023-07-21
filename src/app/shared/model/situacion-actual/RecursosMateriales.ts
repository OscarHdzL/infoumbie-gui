import {DetallePersonal} from "./Personal";

export class RecursosMateriales {
    public equipamiento:DetalleRecursosMateriales[] = [];
    public area: DetalleRecursosMateriales[] = [];

    public totalEquipamiento: number = 0;
    public totalArea: number = 0;
}

export class DetalleRecursosMateriales {
    public tipo: string;
    public desRecursoMaterial: string;
    public numCantidad: number;
}