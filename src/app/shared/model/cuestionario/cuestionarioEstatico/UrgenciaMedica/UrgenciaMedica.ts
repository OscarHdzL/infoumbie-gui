import { UrgenciaMedicaCie10 } from "./UrgenciaMedicaCie10";

export class UrgenciaMedica {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idUrgenciasMedicas? : number = 0;
    cveUsuario? : string;
    noAplica? : number = null;
    cie10UrgenciaMedica? : UrgenciaMedicaCie10[];

    public constructor(init?: Partial<UrgenciaMedica>) {
        Object.assign(this, init);
    }
}