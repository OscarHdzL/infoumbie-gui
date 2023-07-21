
export class DiagnosticoAtencion {

    idDiagnostico? : number;
    diagnostico? : string;
    idCie? : number;
    refCie10? : string;

    public constructor(init?: Partial<DiagnosticoAtencion>) {
        Object.assign(this, init);
    }
}