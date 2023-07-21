import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";
import { PeriodoSemanaService } from "src/app/shared/services/seguimiento/periodo-semana.service";
import { NAVEGACION } from "../../shared/constants/navigation";

@Component({
  selector: "app-avance-semanal",
  templateUrl: "./avance-semanal.component.html",
  styleUrls: ["./avance-semanal.component.css"],
})
export class AvanceSemanalComponent implements OnInit, OnDestroy {
  disabledBtn: boolean = false;
  private subscGetEstado: Subscription;
  private subscGetPeridosSemanas: Subscription;

  constructor(
    private router: Router,
    private estadoService: EstadoService,
    private periodo: PeriodoSemanaService
  ) {}
  ngOnDestroy(): void {
    if (this.subscGetEstado) {
      this.subscGetEstado.unsubscribe();
    }
    if (this.subscGetPeridosSemanas) {
      this.subscGetPeridosSemanas.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscGetEstado = this.estadoService.getEstado$().subscribe(
      (entidad) => {
        if (entidad) {
          //this.disabledBtn = true;
          this.subscGetPeridosSemanas = this.periodo.getPeridosSemanas(entidad.nomEntidad).subscribe(
            (semanas) => {
              console.log(">>>>> getPeridosSemanas: avance-semanal-compt");  
              this.disabledBtn = !semanas;
            },
            (err: any) => {}
          );
        }
      },
      (err: any) => {}
    );
  }

  public irPlanTrabajo() {
    if (!this.disabledBtn) {
      this.router.navigate([NAVEGACION.planTrabajo]);
    }
  }
}
