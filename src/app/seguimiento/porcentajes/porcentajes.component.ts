import { Subscription } from "rxjs";
import { Entidad } from "./../../shared/model/situacion-actual/Entidad";
import { EstadoService } from "./../../shared/services/seguimiento/estado.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeriodoSemanaService } from "src/app/shared/services/seguimiento/periodo-semana.service";
import { Porcentajes } from "src/app/shared/model/seguimiento/porcentajes";
import { SemanaPeriodoService } from "src/app/shared/services/seguimiento/semana-periodo.service";
import { Semana } from "src/app/shared/model/seguimiento/semana";

@Component({
  selector: "app-porcentajes",
  templateUrl: "./porcentajes.component.html",
  styleUrls: ["./porcentajes.component.css"],
})
export class PorcentajesComponent implements OnInit, OnDestroy {
  entidad: Entidad;
  porcentajesSemana: Porcentajes;
  semana: Semana;
  retrasoPorcentaje: number = 0;
  subscGetEstado: Subscription;
  subscGetSemana: Subscription;
  subscGetPorcentajes: Subscription;
  subsGetPeridosSemanas: Subscription;
  busquedaSinResultado: boolean = false;
  entidadEstado: string = "";
  entidadSemana: string = "";

  constructor(
    private periodo: PeriodoSemanaService,
    private estadoService: EstadoService,
    private semPerioService: SemanaPeriodoService
  ) {
    this.porcentajesSemana = new Porcentajes();
  }
  ngOnDestroy(): void {
    if (this.subscGetEstado) {
      this.subscGetEstado.unsubscribe();
    }
    if (this.subscGetSemana) {
      this.subscGetSemana.unsubscribe();
    }
    if (this.subscGetPorcentajes) {
      this.subscGetPorcentajes.unsubscribe();
    }
    if (this.subsGetPeridosSemanas) {
      this.subsGetPeridosSemanas.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscGetEstado = this.estadoService.getEstado$().subscribe(
      (data) => {
        this.entidad = data;
        /* this.porcentajesSemana = new Porcentajes();
        this.porcentajesSemana.esperado = "0";
        this.porcentajesSemana.porcentajeCompletado = "0";
        this.retrasoPorcentaje = 0; */
        /*  if (data) {
          this.entidadEstado = data.nomEntidad;
          this.subsGetPeridosSemanas = this.periodo
            .getPeridosSemanas(data.nomEntidad)
            .subscribe(
              (semanas) => {
                this.busquedaSinResultado = !(semanas && semanas.length > 0);
                if (!(semanas && semanas.length > 0)) {
                  this.porcentajesSemana.esperado = "0";
                  this.porcentajesSemana.porcentajeCompletado = "0";
                  this.retrasoPorcentaje = 0;
                }
              },
              (error: any) => {
                console.log("Error al cargar peridos:", error);
                this.busquedaSinResultado = true;
              }
            );
        } */
        this.cargarPorcentajes();
      },
      (err: any) => {}
    );

    this.subscGetSemana = this.semPerioService.getSemana$().subscribe(
      (data) => {
        this.semana = data;
        /* this.porcentajesSemana = new Porcentajes();
        this.porcentajesSemana.esperado = "0";
        this.porcentajesSemana.porcentajeCompletado = "0"; */
        /* if (data) {
          this.semana = data;
          this.entidadSemana = data.entidad.nomEntidad;
          if (this.entidadEstado!='' && this.entidadEstado == this.entidadSemana) {
            this.getPorcentajes();            
          }
        } else {
          this.busquedaSinResultado = true;
        } */
        this.cargarPorcentajes();
      },
      (err: any) => {}
    );
  }

  getPorcentajes(): void {
    this.subscGetPorcentajes = this.periodo
      .getPorcentajes(this.semana.entidad.nomEntidad, this.semana.numSemana)
      .subscribe(
        (data) => {
          if (data) {
            this.busquedaSinResultado = false;
            this.porcentajesSemana = data;
            this.retrasoPorcentaje =
              Number(data.esperado) - Number(data.porcentajeCompletado);
          }
        },
        (error: any) => {
          console.log("Error al cargar porcentajes:", error);
        }
      );
  }

  cargarPorcentajes(): void {
    if (this.entidad && this.semana &&
      this.entidad.nomEntidad == this.semana.entidad.nomEntidad) {
      /* console.log(">>>>> cargando porcentajes <<<<<");
      console.log(this.entidad);
      console.log(this.semana); */

      this.subscGetPorcentajes = this.periodo
        .getPorcentajes(this.semana.entidad.nomEntidad, this.semana.numSemana)
        .subscribe(
          (data) => {
            if (data) {
              this.busquedaSinResultado = false;
              this.porcentajesSemana = data;
              this.retrasoPorcentaje =
                Number(data.esperado) - Number(data.porcentajeCompletado);
            }
          },
          (error: any) => {
            console.log("Error al cargar porcentajes:", error);
          }
        );
    } else {
      /* console.log(">>>>> no se cargo porcentajes <<<<<");
      console.log(this.entidad);
      console.log(this.semana); */
      this.porcentajesSemana = new Porcentajes();
        this.porcentajesSemana.esperado = "0";
        this.porcentajesSemana.porcentajeCompletado = "0";
      this.busquedaSinResultado = true;
    }
  }
}
