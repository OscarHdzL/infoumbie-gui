export class Equipamiento {
  metrica: string;
  faltanteBrecha: number;
  solicitadoImssB: number;
  malEstado: number;
  buenEstado: number;
  bienesExistencia: number;
  malEstadoFaltante: number;
  necesaria: number;
}

export class RecMatEquiamiento {
  public cveEquipamiento: number;
  public refClues: string;
  public cvePrei:  string;
  public cveSai:  string;
  public descEquipamiento:  string;
  public numCantidad: number
}
