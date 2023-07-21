export class Area {

    idArea? : number;
    area? : string;
    idModulo? : number;
    idEstatus? : number;
    estatus? : string;

    public constructor(init?: Partial<Area>) {
        Object.assign(this, init);
    }
}
