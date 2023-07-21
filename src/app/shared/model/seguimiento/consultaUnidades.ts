export class DataRequest {
  cveEntidad: string;
  nomClasificacion: string;
  palabra: string | null;
  fechaInicio: string | null;
  fechaFin: string | null;
}

export class FormFiltros {
  palabra: null = null;
  fechaUno: null = null;
  fechaDos: null = null;
}

export class ConsultaUnidades {
  totalTransferidas: number;
  totalUnidades: number;
  unidades: Unidades[];
}

export class Unidades {
  cveClue: number;
  nomClue: string;
  cveMunicipio: string;
  nomMunicipio: string;
  fechaTransferencia: string;
  comentarios: number;
  rowNum: number;
  refClues: string;
  desUrlSharePoint: string;
}

export class FechaTransferencia {
  cveClue: number;
  fechaTransferencia: string;
}

export class ListadoUnidades {

  descHospitales: string;
  totalHospitales: number;
  totalTransferidasHospitales: number;
  transSemanaAntHospitales: number;

  descUnemesPrimerNivel: string;
  totalUnemesPrimerNivel: number;
  totalTransferidasUnemesPrimerNivel: number;
  transSemanaAntUnemesPrimerNivel: number;

  descUnemesSegundoNivel: string;
  totalUnemesSegundoNivel: number;
  totalTransferidasUnemesSegundoNivel: number;
  transSemanaAntUnemesSegundoNivel: number;

  descCentroSalud: string;
  totalCentroSalud: number;
  totalTransferidasCentroSalud: number;
  transSemanaAntCentroSalud: number;

  descUnidadesMoviles: string;
  totalUnidadesMoviles: number;
  totalTransferidasUnidadesMoviles: number;
  transSemanaAntUnidadesMoviles: number;

  totalUnidades: number;
  totalTransferidas: number;
  totalTransferidasSemana: number;
  totalTransferidasSemanaAnt: number;

  porcentajeCentroSalud: number;
  porcentajeHospitales: number;
  porcentajeUnemesPrimerNivel: number;
  porcentajeUnemesSegundoNivel: number;
  porcentajeUnidadesMoviles: number;
  porcentajeTotal: number;

}

export class Parametros {
  public cveEntidad: string;
  public nomEntidad: string;
  public descripcion: string;
}

export class UnidadConfirmada {
  descripcion?: string = '';
  unidadMeta?: number = 0;
  conPresencia?: number = 0;
  porcentaje?: number = 0;
}

export class UbicacionClue{
  public cveClues: number;
  public urlLocalizacion: string;
}