import { ListaMedicamentos } from "./ListaMedicamentos";

export class Medicamentos {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idMedicamento? : number = 0;
    cveUsuario? : string;
    canCuadroBasico? : number = null;
    noAplica? : number = null;
    listaMedicamento? : ListaMedicamentos[];

    public constructor(init?: Partial<Medicamentos>) {
        Object.assign(this, init);
    }
}