export class DiagnosticoCIE {

    idCie? : number;
    cie? : string;
    refCie? : string;

    public constructor(init?: Partial<DiagnosticoCIE>) {
        Object.assign(this, init);
    }
}