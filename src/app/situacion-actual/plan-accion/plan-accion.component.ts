import { Component, OnInit } from "@angular/core";
import {
  DetallePlanAcciones,
  Estatus,
} from "src/app/shared/model/situacion-actual/PlanAcciones";
import { CluesService } from "src/app/shared/services/situacion-actual/clues.service";
import { PlanAccionesService } from "src/app/shared/services/situacion-actual/plan-acciones.service";

@Component({
  selector: "app-plan-accion",
  templateUrl: "./plan-accion.component.html",
  styleUrls: ["./plan-accion.component.css"],
})
export class PlanAccionComponent implements OnInit {
  planAccionesInfo: DetallePlanAcciones[] = [];
  conceptos: string[] = [];
  clues: string = "";

  constructor(
    private planAccionesService: PlanAccionesService,
    private cluesService: CluesService
  ) {}

  ngOnInit(): void {
    this.cluesService.getClues$().subscribe((clue) => {
      if (clue) {
        this.clues = clue.refClues;
        this.planAccionesService
          .getInfoPlanAccciones(this.clues)
          .subscribe((planAcciones) => {
            this.planAccionesInfo = planAcciones;
            this.conceptos = this.planAccionesService.getConceptos(
              this.planAccionesInfo
            );
            this.conceptos = this.conceptos.filter(Boolean); // Limpia datos nulos del listado conceptos
          });
      }
    });
  }

  obtenEstatusPrincipal(concepto: string, columna: string = "estatus"): string {
    let estatus: Estatus[] = [];
    let ponderacionEstatus: number[] = [];
    const claves = this.planAccionesService.obtenClavesDeActividades(
      this.planAccionesInfo
    );
    if (claves.includes(columna)) {
      const actividadesPorConcepto: DetallePlanAcciones[] =
        this.planAccionesService.getActividadesPorConcepto(
          this.planAccionesInfo,
          concepto
        );
      actividadesPorConcepto.map((actividades) => {
        estatus.push(
          this.planAccionesService.obtenDatosEstatusPorEstatus(
            actividades.estatus
          )
        );
      });
      estatus = estatus.filter(Boolean);
      estatus.map(({ ponderacion }) => {
        ponderacionEstatus.push(ponderacion);
      });
      return this.planAccionesService.obtenDatosEstatusPorPonderacion(
        Math.min(...ponderacionEstatus)
      ).nombre;
    } else {
      return "Sin estatus";
    }
  }
}
