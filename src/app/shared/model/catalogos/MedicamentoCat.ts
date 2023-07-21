export class MedicamentoCat {

    idMedicamento? : number;
    idGrupo? : string;
    idGen? : string;
    idEsp? : string;
    idDif? : string;
    idVar? : string;
    generico? : string;
    concentracion? : string;
    forma? : string;
    cantidad? : number;

    public constructor(init?: Partial<MedicamentoCat>) {
        Object.assign(this, init);
    }
}