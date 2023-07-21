import { UrgenciaOtrasCie10 } from "./UrgenciaOtrasCie10";

export class UrgenciaOtras {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idOtrasUrgencias? : number = 0;
    cveUsuario? : string;
    noAplica? : number = null;
    cie10OtrasUrgencias? : UrgenciaOtrasCie10[];

    public constructor(init?: Partial<UrgenciaOtras>) {
        Object.assign(this, init);
    }
}