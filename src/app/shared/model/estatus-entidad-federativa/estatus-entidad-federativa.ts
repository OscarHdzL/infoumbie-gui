export class EstatusEntidadFederativa {

    desComentario? : string;
    desRiesgo? : string;
    cveEntidad? : string;
    desSemana? : string;
    cveUsuarioAlta? : string;
    desActividadesSigSemana? : string;

    public constructor(init?: Partial<EstatusEntidadFederativa>) {
        Object.assign(this, init);
    }
}
