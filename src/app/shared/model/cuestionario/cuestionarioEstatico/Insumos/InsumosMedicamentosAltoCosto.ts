export class AltoCosto {

    idAltoCosto? : number;
    idMedicamentoCatalogo? : number;
    medicamento? : string;
    canPresenta? : string;
    concentracion? : string;
    forma? : string;

    public constructor(init?: Partial<AltoCosto>) {
        Object.assign(this, init);
    }
}