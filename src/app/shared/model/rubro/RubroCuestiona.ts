export class RubroCuestiona {

    idRubroCuestiona?: number;
    idRubro? : number;
    idEstatus? : number;
    idClues? : number;
    idArea? : number;
    cveUsuario? : string;

    public constructor(init?: Partial<RubroCuestiona>) {
        Object.assign(this, init);
    }

}