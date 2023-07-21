
export class PlantillaActual {
    public plantillaActual?: DetallePersonal[];
    public totalPlantillaActual?: number = 0;
}

export class DetallePersonal {
    public desPersonal: string;
    public numCantidad: number;
}

export class PersonalResidentes {
    public personal?: DetallePersonal[] = [];
    public residentes?: DetallePersonal[] = [];

    public totalPersonal?: number = 0;
    public totalResidentes?: number = 0;

    public addPersona(detalle: DetallePersonal) {
        this.personal.push(detalle)
    }

    public addResidente(detalle: DetallePersonal) {
        this.residentes.push(detalle)
    }
}