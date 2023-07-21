import { DiagnosticoReferencia } from "./DiagnosticosReferencia";

export class Referencias {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idReferencia? : number = 0;
    cveUsuario? : string;
    envioReferencia? : number = null;
    noAplica? : number = null;
    tiempoAtencionDia? : string = null;
    // tiempoAtencionMes? : string = null;
    diagnosticosReferencia? : DiagnosticoReferencia[];

    public constructor(init?: Partial<Referencias>) {
        Object.assign(this, init);
    }
}