export class AcuerdoModel {
    id: number = 0
    catMesaEntregaId: number = null
    catSemanaId: number = null
    catEstatusAcuerdoId: number = null
    titulo: string = null
    detalle: string = null
    porcentajeEntrega: number = null
    porcentajeValidacion: number = null
    fechaCreacion: Date = new Date();

    edicionEntrega?: boolean = false;
    edicionValidacion?: boolean = false;
    comentarios: Comentario[]
}




export class AcuerdoAuxModel {
  acuerdo: AcuerdoModel
  countComentarios: number
}

/* export class Acuerdo {
  id: number
  catMesaEntregaId: number
  catSemanaId: number
  catEstatusAcuerdoId: number
  titulo: string
  detalle: string
  porcentajeEntrega: number
  porcentajeValidacion: number
  fechaCreacion: string
  comentarios: Comentario[]
} */

export class Comentario {
  id: number
  comentario: string
  fechaCreacion: string
}
