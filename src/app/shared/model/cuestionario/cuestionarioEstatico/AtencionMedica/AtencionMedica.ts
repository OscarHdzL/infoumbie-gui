import { DiagnosticoAtencion } from "./DiagnosticoAtencion";

export class AtencionMedica {

    idClues? : number;
    idRubro? : number;
    idAtencionMedica? : number = 0;
    distanciaMaxima? : number;
    distanciaMinima? : number;
    poblacion? : number;
    cveUsuario? : string;   
    noAplica? : number = null;
    diagnosticoAtencion? : DiagnosticoAtencion[];

    public constructor(init?: Partial<AtencionMedica>) {
        Object.assign(this, init);
    }
}