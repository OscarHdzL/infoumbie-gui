export class AvanceSemanal {
  cveAvanceSemanal: number;
  desComentario: string;
  cveSemanaEstado: number;
  cveTipoAvanceSemanal: number;
  cveUsuarioAlta?: any;
  cveUsuarioModifica?: any;
  cveUsuarioBaja?: any;
  fecAlta?: any;
  fecModifica?: any;
  fecBaja?: any;
}

export class AvanceSemanalComentario {
  public cveAvanceSemanal: number;
  public desComentario: string;
  public desSemana: string;
  public cveEntidad: string;
  public cveTipoAvanceSemanal: string;
  public cveUsuarioAlta: string;
}

export class ListadoIndicadores {
  error?: boolean;
  mensajeError?: string;
  cveIndicadorEstado: null;
  numAcumulado: number;
  numAvance: number;
  porAvance: number;
  indicadorEstado: IndicadorEstado;
}

export class IndicadorEstado {
  cveIndicadorEstado: number;
  numTotal: number;
  indicador: Indicador;
  cveEstado: string;
}

export class Indicador {
  cveIndicador: number;
  nomIndicador: string;
  cveTipoAvanceSemanal: number;
}

export class ActualizarIndicador {
  cveEntidad: string;
  desSemana: string;
  cveTipoAvanceSemanal: number;
  cveUsuarioAlta: string;
  indicadores: Indicadores[];
}

export class Indicadores {
  numAvance: number;
  numAcumulado: number;
  porAvance: number;
  cveIndicador: number;
}

export class DatosPowerPoint {
  nombreArchivo: string;
  archivoBase64: string;
}

export class Tab {
  id: number;
  nombre: string;
  comentario: string;
  cveAvanceSemanal: number;
  listadoIndicadores: ListadoIndicadores[];
  titulosIndicadores?: any;
  permiso: string;  
}