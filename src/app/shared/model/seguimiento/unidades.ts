
export interface IUnidad {
  cveClue: number;
  nomClue: string;
  cveMunicipio: string;
  nomMunicipio: string;
  nomClasificacion: string;
  fechaTransferencia?: any;
  refClues: string;
  desUrlSharePoint?: any;
  comentarios: number;
  fechaConfirmacion?: any;
  rowNum: number;
}

export interface IUnidades {
  totalUnidades: number;
  totalTransferidas: number;
  totalConfirmadas: number;
  totalUnidadesPorConfirmar: number;
  unidades?: IUnidad[];
  unidadesPorConfirmar?: IUnidad[];
}

export interface IUnidadesRequest {
  cveEntidad: string;
  nomClasificacion?: string;
  palabra?: string;
}


export class IUnidadConfirmar {
  descHospitales?: string = '';
  totalHospitales?: number = 0;
  descUnemesPrimerNivel?: string = '';
  totalUnemesPrimerNivel?: number = 0;
  descUnemesSegundoNivel?: string = '';
  totalUnemesSegundoNivel?: number = 0;
  descCentroSalud?: string = '';
  totalCentroSalud?: number = 0;
  descUnidadesMoviles?: string = '';
  totalUnidadesMoviles?: number = 0;
  totalUnidades?: number = 0;
}
