export class TotalUnidades {
    public totalUnidades: number;
    public totalTransferidas: number;
    public unidades: Unidades [];
}

export class Unidades {
    public cveClue: number;
    public nomClue: string;
    public cveMunicipio: string;
    public nomMunicipio: string;
    public nomNivelAtencion: string;
    public fechaTransferencia: string;
    public comentarios: number;
    public rowNum: number;
}

export class UnidadesFiltro{
    public unidades: Unidades[];
    public loading: boolean;
}