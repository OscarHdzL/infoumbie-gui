export interface Observacion {
    cveObservacion:  number;
    desObservacion:  string;
    tipoObservacion: TipoObservacion;
    cveClues:        number;
}

export interface TipoObservacion {
    cveTipoObservacion: number;
    desTipoObservacion: string;
}