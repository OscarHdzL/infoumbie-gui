import { UrgenciaGinecologicasCie10 } from "./UrgenciasGinecologicasCie10";

export class UrgenciaGinecologicas {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idUrgenciasGinecologicas? : number = 0;
    cveUsuario? : string;
    noAplica? : number = null;
    cie10UrgenciaGinecologica? : UrgenciaGinecologicasCie10[];

    public constructor(init?: Partial<UrgenciaGinecologicas>) {
        Object.assign(this, init);
    }
}