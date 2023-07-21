import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SemanaModel } from 'src/app/shared/model/MesaEntrega/SemanaModel';
import { PeriodoSemanal } from 'src/app/shared/model/seguimiento/periodo-semanal';
import { Semana } from 'src/app/shared/model/seguimiento/semana';
import { Entidad } from 'src/app/shared/model/situacion-actual/Entidad';
import { SemanasService } from 'src/app/shared/services/MesaEntrega/semanas.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { PeriodoSemanaService } from 'src/app/shared/services/seguimiento/periodo-semana.service';
import { SemanaPeriodoService } from 'src/app/shared/services/seguimiento/semana-periodo.service';

@Component({
  selector: 'app-semanas',
  templateUrl: './semanas.component.html',
  styleUrls: ['./semanas.component.css']
})
export class SemanasComponent implements OnInit {
public listaSemanas = new Array<SemanaModel>();


  semanaPosicion: number = 0;
  private periodoSemana: Subscription;
  peridos: SemanaModel[] = [];
  periodo: SemanaModel;
  entidad: Entidad;
  semana: Semana;
  selectedSemana: string = "";

  subsGetPeridosSemanas: Subscription;
  cargandoInfo: boolean;
  sinResultados: boolean = false;

  semanaServiceSubscription$: Subscription;
  semanaActualModel: SemanaModel;

  constructor(
/*     private servicePeriodo: PeriodoSemanaService,
    private semPerioService: SemanaPeriodoService, */
    private semanasService: SemanasService,
    private modalDialogService: ModalDialogService,
  ) {
    this.periodo = new SemanaModel();
    this.semana = new Semana();
    this.cargandoInfo = true;

    this.cargarPeriodos();
    this.initDropdown();
  }

  async ngOnInit() {
/*    await this.cargarPeriodos();
    this.initDropdown(); */

    this.semanaServiceSubscription$ = this.semanasService.getSemana().subscribe(
      (data) => {
        console.log("SemanaActual" , data);
        this.semanaActualModel = data;
      });


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

  cargarPeriodos() {
    
    this.subsGetPeridosSemanas = this.semanasService
      .getSemanas()
      .subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.cargandoInfo = false;
            this.listaSemanas = data;
            
            this.listaSemanas.forEach((x)=>{
              x.periodoInicio = this.convertirFecha(x.inicio);
              x.periodoFin = this.convertirFecha(x.fin)
            });
            this.peridos = this.listaSemanas;
            //this.periodo = this.listaSemanas[0];
            //SE OBTIENE LA SEMANA ACTUAL DE ACUERDO AL DIA
            
            var hoyArreglo = new Date().toLocaleDateString('es-MX').split('/');
            let hoy = new Date(Number(hoyArreglo[2]), Number(hoyArreglo[1]) - 1, Number(hoyArreglo[0]));

            if(this.semanaActualModel){
              debugger
              this.periodo = this.semanaActualModel;
              this.semanaPosicion = this.listaSemanas.indexOf(this.periodo)
              this.selectedSemana = this.periodo.semana;
              this.semanasService.setSemana(this.periodo);
            } else {
              this.periodo = this.listaSemanas.filter((x)=> new Date(x.inicio) <= hoy && new Date(x.fin) >= hoy)[0];
              this.semanaPosicion = this.listaSemanas.indexOf(this.periodo)
              this.selectedSemana = this.periodo.semana;
              this.semanasService.setSemana(this.periodo);
          }
          } else {
            this.peridos = [];
            this.sinResultados = true;
            this.semanasService.setSemana(null);
          }
        },
        (error: any) => {
          console.log("Error al cargar peridos:", error);
          this.sinResultados = true;
        }
      );
  }

  ngOnDestroy(): void {

    if (this.subsGetPeridosSemanas) {
      this.subsGetPeridosSemanas.unsubscribe();
    }
  }

  async semanaAnterior() {
    
    this.semanaPosicion--;    
    this.emmitEventSemana(true);
  }

  async semanaSiguiente(isClick: boolean) {
    
    this.semanaPosicion++;    
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
    this.selectedSemana = this.peridos[this.semanaPosicion].semana;
    
    if (emit) {
      this.semanasService.setSemana(this.periodo);
    }

  }

  onChangeSemana(event) { 
    
    const smn = this.peridos.find((value) => value.semana === event);
    this.periodo = smn;
    const smnPosicion = this.peridos.indexOf(smn);
    if (smnPosicion > -1) {
      this.semanaPosicion = smnPosicion;
      this.emmitEventSemana(true);
    }
  }

  getSemanaSelect() {
    let smn = new SemanaModel();
    smn.semana = this.separaDiaSemana(this.selectedSemana).toString();
    smn.semana = this.selectedSemana;

    return smn;
  }

  convertirFecha(fecha: string){ 

    let arreglo = fecha.split('-');
    let fechaConvertida = '';
    switch(arreglo[1]){
      case '01':
          fechaConvertida = arreglo[2] + ' Enero ' + arreglo[0];
        break;
      case '02':
          fechaConvertida = arreglo[2] + ' Febrero ' + arreglo[0];
        break;
        case '03':
          fechaConvertida = arreglo[2] + ' Marzo ' + arreglo[0];
        break;
        case '04':
          fechaConvertida = arreglo[2] + ' Abril ' + arreglo[0];
        break;
        case '05':
          fechaConvertida = arreglo[2] + ' Mayo ' + arreglo[0];
        break;
        case '06':
          fechaConvertida = arreglo[2] + ' Junio ' + arreglo[0];
        break;
        case '07':
          fechaConvertida = arreglo[2] + ' Julio ' + arreglo[0];
        break;
        case '08':
          fechaConvertida = arreglo[2] + ' Agosto ' + arreglo[0];
        break;
        case '09':
          fechaConvertida = arreglo[2] + ' Septiembre ' + arreglo[0];
        break;
        case '10':
          fechaConvertida = arreglo[2] + ' Octubre ' + arreglo[0];
        break;
        case '11':
          fechaConvertida = arreglo[2] + ' Noviembre ' + arreglo[0];
        break;
        case '12':
          fechaConvertida = arreglo[2] + ' Diciembre ' + arreglo[0];
        break;
    }

    return fechaConvertida;
  }



}
