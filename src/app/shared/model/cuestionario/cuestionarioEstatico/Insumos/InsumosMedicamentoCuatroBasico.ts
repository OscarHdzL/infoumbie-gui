export class CuatroBasico {

    idCuadroBasico? : number;
    idMedicamentoCatalogo? : number;
    medicamento? : string;
    canPresenta? : string;
    concentracion? : string;
    forma? : string;

    public constructor(init?: Partial<CuatroBasico>) {
        Object.assign(this, init);
    }
}