export class DiagnosticoReferencia {

    idDiagnosticoReferencia? : number;
    diagnostico? : string;
    idCie? : number;
    refCie10? : string;

    public constructor(init?: Partial<DiagnosticoReferencia>) {
        Object.assign(this, init);
    }
}