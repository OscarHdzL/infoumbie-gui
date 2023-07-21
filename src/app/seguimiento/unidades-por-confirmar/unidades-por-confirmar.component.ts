import { IUnidadConfirmar } from './../../shared/model/seguimiento/unidades';
import { Subscription } from "rxjs";
import { Semana } from "src/app/shared/model/seguimiento/semana";
import { SemanaPeriodoService } from "src/app/shared/services/seguimiento/semana-periodo.service";
import { Entidad } from "./../../shared/model/situacion-actual/Entidad";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";
import { UnidadesService } from "src/app/shared/services/seguimiento/unidades.service";
import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NAVEGACION } from "src/app/shared/constants/navigation";

@Component({
  selector: "app-unidades-por-confirmar",
  templateUrl: "./unidades-por-confirmar.component.html",
  styleUrls: ["./unidades-por-confirmar.component.css"],
})
export class UnidadesPorConfirmarComponent implements OnInit, OnDestroy {
  niveles = {
    Centrosdesalud: "Centros de Salud",
    hospitales: "Hospitales",
    UNEMES1nivel: "UNEMES Primer Nivel",
    UNEMES2nivel: "UNEMES Segundo Nivel",
    unidadesMedicasMoviles: "Unidad Movil",
  };

  private semana: Semana;
  private subscgetSemana: Subscription;
  private subscgetUnidadesPorConfirmar: Subscription;
  unidadesPConfirmar: IUnidadConfirmar = new IUnidadConfirmar();
  permiso: string = 'EDITAR_UNIDAD';
  cargando: boolean =true;

  constructor(
    private router: Router,
    private servUnidad: UnidadesService,
    private servSemana: SemanaPeriodoService
  ) {}

  ngOnDestroy(): void {
    if (this.subscgetSemana) this.subscgetSemana.unsubscribe();
    if (this.subscgetUnidadesPorConfirmar)
      this.subscgetUnidadesPorConfirmar.unsubscribe();
  }

  ngOnInit(): void {
    //this.cargarUnidadesPorConfirmar();
    this.cargarSemana();
  }

  cargarSemana(): void {
    this.subscgetSemana = this.servSemana.getSemana$().subscribe(
      (success) => {
        if (success) {
          this.semana = success;
          this.cargarUnidadesPorConfirmar();
        }
      },
      (err: any) => {
        console.log("Error al cargar la semana seleccionada", err);
      }
    );
  }

  cargarUnidadesPorConfirmar(): void {

    this.cargando = true;
    this.subscgetUnidadesPorConfirmar = this.servUnidad
      .getUnidadesPorConfirmar(
        this.semana.entidad.cveEntidad,
        this.semana.numSemana.toString()
      )
      .subscribe(
        (success) => {
          if (success) {
            console.log(">>>>> Carga completa de unidades por confirmar", success);
            this.unidadesPConfirmar = success;
            this.cargando = false;
          }
        },
        (err: any) => {
          console.log("Error al cargar la semana seleccionada", err);
        }
      );
  }

  irPageUnidades(clave: string = "Centros de Salud"): void {
    sessionStorage.setItem("PARAM_DESC_NIVEL", clave);
    this.router.navigate([NAVEGACION.unidadesPorConfirmar]);
  }
}
