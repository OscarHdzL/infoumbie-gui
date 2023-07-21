import { Semana } from "./../../shared/model/seguimiento/semana";
import { SemanaPeriodoService } from "./../../shared/services/seguimiento/semana-periodo.service";
import { Entidad } from "./../../shared/model/situacion-actual/Entidad";
import { EstadoService } from "./../../shared/services/seguimiento/estado.service";
import { PeriodoSemanal } from "./../../shared/model/seguimiento/periodo-semanal";
import { Subscription } from "rxjs";
import { PeriodoSemanaService } from "./../../shared/services/seguimiento/periodo-semana.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-periodo-comp",
  templateUrl: "./periodo-comp.component.html",
  styleUrls: ["./periodo-comp.component.css"],
})
export class PeriodoCompComponent implements OnInit, OnDestroy {
  semanaPosicion: number = 0;
  private periodoSemana: Subscription;
  peridos: PeriodoSemanal[] = [];
  periodo: PeriodoSemanal;
  entidad: Entidad;
  semana: Semana;
  selectedSemana: string = "";
  subscGetEstado: Subscription;
  subsGetPeridosSemanas: Subscription;
  cargandoInfo: boolean;
  sinResultados: boolean = false;

  constructor(
    private servicePeriodo: PeriodoSemanaService,
    private estadoService: EstadoService,
    private semPerioService: SemanaPeriodoService
  ) {
    this.periodo = new PeriodoSemanal();
    this.semana = new Semana();
    this.cargandoInfo = true;
  }

  ngOnInit(): void {
    this.subscGetEstado = this.estadoService.getEstado$().subscribe((data) => {
      if (data) {
        this.sinResultados = false;
        this.cargandoInfo = true;
        this.entidad = data;
        this.semanaPosicion = 0;
        this.periodo = new PeriodoSemanal();
        this.cargarPeriodos(data);
      }
    });
    this.initDropdown();
  }

  initDropdown(): void {
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }

  cargarPeriodos(entidad: Entidad) {
    this.subsGetPeridosSemanas = this.servicePeriodo
      .getPeridosSemanas(entidad.nomEntidad)
      .subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.cargandoInfo = false;
            this.peridos = data;
            //this.semanaPosicion = 0;
            this.selectedSemana = data[0].numSemana;
            this.periodo = this.peridos[0];
            this.semPerioService.setSemana(this.getSemanaSelect());
          } else {
            this.peridos = [];
            this.sinResultados = true;
            this.semPerioService.setSemana(null);
          }
        },
        (error: any) => {
          console.log("Error al cargar peridos:", error);
          this.sinResultados = true;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.periodoSemana) {
      this.periodoSemana.unsubscribe();
    }
    if (this.subscGetEstado) {
      this.subscGetEstado.unsubscribe();
    }
    if (this.subsGetPeridosSemanas) {
      this.subsGetPeridosSemanas.unsubscribe();
    }
  }

  async semanaAnterior() {
    this.semanaPosicion++;    
    this.emmitEventSemana(true);
  }

  async semanaSiguiente(isClick: boolean) {
    this.semanaPosicion--;    
    this.emmitEventSemana(isClick);
  }

  separaDiaSemana(semana: string) {
    const mysplit = semana.split(" ");
    var numSemana = 0;
    if (mysplit.length > 1) {
      numSemana = Number(mysplit[1]);
    }
    return Number(numSemana);
  }

  async emmitEventSemana(emit: boolean) {

    this.periodo = this.peridos[this.semanaPosicion];    
    this.selectedSemana = this.peridos[this.semanaPosicion].numSemana;
    
    if (emit) {
      this.semPerioService.setSemana(this.getSemanaSelect());
    }

  }

  onChangeSemana(event) {    
    const smn = this.peridos.find((value) => value.numSemana === event);
    this.periodo = smn;
    const smnPosicion = this.peridos.indexOf(smn);
    if (smnPosicion > -1) {
      this.semanaPosicion = smnPosicion;
      this.emmitEventSemana(true);
    }
  }

  getSemanaSelect() {
    let smn = new Semana();
    smn.numSemana = this.separaDiaSemana(this.selectedSemana);
    smn.semana = this.selectedSemana;
    smn.entidad = this.entidad;
    return smn;
  }
}
