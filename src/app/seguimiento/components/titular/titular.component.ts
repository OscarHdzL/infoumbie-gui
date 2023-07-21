import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { PeriodoSemanaService } from "./../../../shared/services/seguimiento/periodo-semana.service";
import { Entidad } from "./../../../shared/model/situacion-actual/Entidad";
import { PeriodoSemanal } from "./../../../shared/model/seguimiento/periodo-semanal";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";

@Component({
  selector: "app-titular",
  templateUrl: "./titular.component.html",
  styleUrls: ["./titular.component.css"],
})
export class TitularComponent implements OnInit, OnDestroy {
  
  @Input()
  subtitular?: string = '';
  @Input()
  irAtras?: string = NAVEGACION.seguimiento;

  cargandoFechas: boolean = true;
  busquedaSinResultados: boolean = false;
  
  private estadoSubscription: Subscription;
  private periodosSubscription: Subscription;

  entidad: Entidad;
  periodo: PeriodoSemanal;

  constructor(
    private estadoService: EstadoService,
    private servicePeriodo: PeriodoSemanaService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.estadoSubscription.unsubscribe();
    if (this.periodosSubscription) this.periodosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarEstado();
  }

  private cargarEstado(): void {
    this.estadoSubscription = this.estadoService
      .getEstado$()
      .subscribe((estado) => {    
        if (estado && estado!=null) {
          console.log(">>>>> titular-compt: ", estado);    
          this.entidad = estado;
          this.cargarPeriodo();
        }
      });
  }

  private cargarPeriodo(): void {
    this.cargandoFechas = true;
    this.busquedaSinResultados = false;
    this.periodo = new PeriodoSemanal();
    this.periodosSubscription = this.servicePeriodo
      .getPeridosSemanas(this.entidad.nomEntidad)
      .subscribe(
        (data) => {
          console.log(">>>>> getPeridosSemanas: titular-compt");          
          this.cargandoFechas = false;
          if (data && data.length > 0) {
            this.periodo = data[0];
          } else {
            this.busquedaSinResultados = true;
          }
        },
        (error: any) => {
          console.log("Error al cargar periodos:", error);
        }
      );
  }

  atras(): void {
    this.router.navigate([this.irAtras]);
  }
}
