export class Asignacion {

    public constructor(init?: Partial<Asignacion>) {
        Object.assign(this, init);
    }

    clues?: string;
    refClues?: string;
    idEntidad?: string;
    entidad?: string;
    idMunicipio?: string;
    municipio?: string;
    idLocalidad?: string;
    localidad?: string;
    idInstitucion?: string;
    institucion?: string;
    tipoEstablecimiento?: string;
    nombreEstablecimiento?: string;
    tipologia?: string;
    idEstratoUnidad?: number;
    estratoUnidad?: string;
    idModulo?: number;
    modulo?: string;
    fechaConstruccion?: string;
    fechaInicial?: string;

  }