export class Rubro {

    idArea? : number;
    idRubro? : number;
    rubro? : string;
    estatus? : string;
    idEstatus? : number;
    indDinamico? : number;
    indSelected: boolean = false;

    public constructor(init?: Partial<Rubro>) {
        Object.assign(this, init);
    }

}