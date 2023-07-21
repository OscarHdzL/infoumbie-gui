import { UrgenciaPediatricaCie10 } from "./UrgenciaPediatricaCie10";

export class UrgenciaPediatrica {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idUrgenciasPediatricas? : number = 0;
    cveUsuario? : string;
    noAplica? : number = null;
    cie10UrgenciaPediatrica? : UrgenciaPediatricaCie10[];

    public constructor(init?: Partial<UrgenciaPediatrica>) {
        Object.assign(this, init);
    }
}