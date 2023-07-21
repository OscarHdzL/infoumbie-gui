import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-modal-cancelar",
  templateUrl: "./modal-cancelar.component.html",
  styleUrls: ["./modal-cancelar.component.css"],
})
export class ModalCancelarComponent implements OnInit {
  @Input() identificador: string = ""; // IDENTIFICADOR DEL MODAL
  @Input() titulo: string = "Atención";
  @Input() descripcion: string =
    "¿Estás seguro de cancelar el registro? Los datos ingresados serán eliminados.";
  @Input() tituloBotonCancelar: string = "Cancelar";
  @Input() tituloBotonAceptar: string = "Aceptar";
  @Input() tipoModal: string = "EF"; // EF = SECCION ENTIDAD FEDERATIVA, MT = SECCION MESA DE TRABAJO
  @Input() parametros: any;
  @Output() limpiarContador = new EventEmitter<number>();
  @Input() permiso: string = "";

  constructor() {}

  ngOnInit(): void {}

  cancelado() {
    if (this.tipoModal === "EF") {
      // Todo: LOGICA DE LA SECCION Estatus semanal de la entidad federativa
      $(`#cancelado`).modal("hide");
      this.limpiarContador.emit(0);
    }

    if (this.tipoModal === "MT") {
      // Todo: LOGICA DE LA SECCION Avance semanal de la mesa de trabajo
      this.parametros.comentario = "";
      if (this.parametros.listadoIndicadores.length > 0) {
        this.parametros.listadoIndicadores.map((indicador) => {
          if (
            this.permiso === "CONS_INFRA" ||
            this.permiso === "ABASTO" ||
            this.permiso === "MEDICA" ||
            this.permiso === 'EQUIPAMIENTO'
          ) {
            indicador.porAvance = "";
          }
          if (this.permiso === "RRHH") {
            indicador.numAvance = "";
          }
        });
      }
      $(`#cancelado_${this.parametros.id}`).modal("hide");
    }
  }
}
