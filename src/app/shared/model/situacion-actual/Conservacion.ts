export class CantidadYNecesidades {
  cantidad: number;
  necesidades: number;
}

export class Equipo {
  cluePrin: string;
  equipoPrin: string;
  categoria: string;
  totalCantidad: number;
  totalNecesidades: number;
  buenoCantidad: number;
  buenoNecesidades: number;
  regularCantidad: number;
  regularNecesidades: number;
  criticoCantidad: number;
  criticoNecesidades: number;
  fueraServicioCantidad: number;
  fueraServicioNecesidades: number;
  noEspecificadoCantidad: number;
  noEspecificadoNecesidades: number;
}

export class Conservacion {
  bueno: CantidadYNecesidades;
  regular: CantidadYNecesidades;
  critico: CantidadYNecesidades;
  fueraServicio: CantidadYNecesidades;
  noEspecificado: CantidadYNecesidades;
  totalGeneral: CantidadYNecesidades;
  equipoMedico: Equipo[];
  electromecanico: Equipo[];
  totalEquipoMedico: CantidadYNecesidades;
  totalElectromecanico: CantidadYNecesidades;
}
