export class DetallePlanAcciones {
  public hospital: string;
  public concepto: string;
  public actividad: string;
  public responsable: string;
  public fechaInicio?: string | Date;
  public fechaFin?: string | Date;
  public estatus?: string;
}

export class Estatus {
  nombre: string;
  comparacion: string;
  ponderacion: number;
}
