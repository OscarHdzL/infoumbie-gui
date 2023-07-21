export class Estadisticas {

    idClues?: number;
    clues? : string;
    nombreUnidad? : string;
    entidadFederativa? : string;
    idEntidadFederativa? : string;
    idNivel?: number;
    jurisdiccion? : string;
    preguntasContestadas?: number;

    public constructor(init?: Partial<Estadisticas>) {
        Object.assign(this, init);
    }
}