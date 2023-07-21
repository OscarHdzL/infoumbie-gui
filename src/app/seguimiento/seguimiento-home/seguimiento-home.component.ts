import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { EstadoService } from "../../shared/services/seguimiento/estado.service";
import { ModalDialogService } from "../../shared/services/common/modal-dialog.service";
import { AvanceSemanal } from "src/app/shared/model/seguimiento/AvanceSemanalMesaTrabajo";
import { AvanceSemanalMesaTrabajoComponent } from "../avance-semanal-mesa-trabajo/avance-semanal-mesa-trabajo.component";
import { EstatusSemanalComponent } from "../estatus-semanal/estatus-semanal.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { PeriodoSemanal } from "src/app/shared/model/seguimiento/periodo-semanal";
import { PeriodoSemanaService } from "src/app/shared/services/seguimiento/periodo-semana.service";
import { WebsocketService } from "src/app/shared/services/seguimiento/websocket.service";
import { PermisosService } from "src/app/shared/services/autenticacion/permisos.service";

@Component({
  selector: "app-seguimiento-home",
  templateUrl: "./seguimiento-home.component.html",
  styleUrls: ["./seguimiento-home.component.css"],
})
export class SeguimientoHomeComponent implements OnInit, OnDestroy {
  public estado: string = "Estado";
  public avanceSemanalMesaTrabajo: AvanceSemanal;

  @ViewChild("estatusSemanal") estatusSemanal: EstatusSemanalComponent;
  @ViewChild("mesaTrabajo") avanceSemanal: AvanceSemanalMesaTrabajoComponent;

  public banderaGuardar: boolean = false;
  public estadoSubscription: Subscription;
  periodo: PeriodoSemanal;
  public websocketSuscription: Subscription;
  public subscGetPeridosSemanas:  Subscription;

  constructor(
    private estadoService: EstadoService,
    private modalDialogService: ModalDialogService,
    private servicePeriodo: PeriodoSemanaService,
    private router: Router,
    private websocketService: WebsocketService,
    private permisosService: PermisosService
  ) {}

  ngOnInit(): void {
    this.estadoService.setEstado(null);

    this.estadoSubscription = this.estadoService
      .getEstado$()
      .subscribe((estadoFiltro) => {
        if (estadoFiltro) {
          this.estado = estadoFiltro.nomEntidad;
          this.obtenerFechasPeriodo(estadoFiltro.nomEntidad);
        }
      });
    this.escuchaWebsocket();  
  }

  ngOnDestroy() {
    if (this.estadoSubscription) {
      this.estadoSubscription.unsubscribe();
    }
    if (this.websocketSuscription) {
      this.websocketSuscription.unsubscribe();
    }
    if (this.subscGetPeridosSemanas) {
      this.subscGetPeridosSemanas.unsubscribe();
    }
  }

  cancelar() {
    this.modalDialogService.showDialog(
      "Atención",
      "Atención",
      "No existen datos para la consulta.",
      () => {}
    );
  }

  obtenerFechasPeriodo(clave: string) {
    this.periodo = new PeriodoSemanal();   
     this.subscGetPeridosSemanas = this.servicePeriodo.getPeridosSemanas(clave).subscribe(
      (data) => {
        console.log(">>>>> getPeridosSemanas: home-compt"); 
        if (data && data.length > 0) {
          this.periodo = data[0];
        } else {
          let sinDatos = "Sin resultados";
          this.periodo.fechaFin = sinDatos;
          this.periodo.fechaInicio = sinDatos;
        }
      },
      (error: any) => {
        console.log("Error al cargar peridos:", error);
      }
    );
  }

  public atras() {
    this.router.navigate(["avance-general"]);
  }

  public escuchaWebsocket() {
    this.websocketSuscription = this.websocketService
      .getWebSocket$()
      .subscribe((resp) => {
        this.permisosService.setPermisosComponentes(resp);
      });
  }
}
