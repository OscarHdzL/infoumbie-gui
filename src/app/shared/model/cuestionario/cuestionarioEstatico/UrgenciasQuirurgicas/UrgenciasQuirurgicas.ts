import { UrgenciaQuirurgicasCie10 } from "./UrgenciasQuirurgicasCie10";

export class UrgenciaQuirurgicas {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idUrgenciasQuirurgicas? : number = 0;
    cveUsuario? : string;
    noAplica? : number = null;
    cie10UrgenciaQuirurgica? : UrgenciaQuirurgicasCie10[];

    public constructor(init?: Partial<UrgenciaQuirurgicas>) {
        Object.assign(this, init);
    }
}