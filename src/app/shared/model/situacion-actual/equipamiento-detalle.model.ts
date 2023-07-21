export class EquipamientoDetalle {
  total: number = 0;
  recursosMaterialesDetalle: {
    cveClues: string;
    nivel: string;
    metrica: string;
    desArticulo: string;
    faltanteBrecha: number;
    solicitadoImssB: number;
    malEstado: number;
    buenEstado: number;
    bienesExistencia: number;
    malEstadoFaltante: number;
    necesaria: number;
  }[];
}
