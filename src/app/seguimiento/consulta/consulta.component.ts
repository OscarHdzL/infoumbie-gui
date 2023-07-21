import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadoService } from 'src/app/shared/services/seguimiento/estado.service';
import { PeriodoSemanaService } from 'src/app/shared/services/seguimiento/periodo-semana.service';
import { PeriodoSemanal } from 'src/app/shared/model/seguimiento/periodo-semanal';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, OnDestroy {
 
  public descNivel: string = '';
  public estado: string = "";
  public periodo: PeriodoSemanal = new PeriodoSemanal();
  public fechaPeriodo: PeriodoSemanal = new PeriodoSemanal();
  public loadingFecha: boolean = true;

  private suscServicePeriodo: Subscription;
  private suscServiceEstado: Subscription;

  public tipoUnidad: number = 0;

  constructor(
    private estadoService: EstadoService,
    private servicePeriodo: PeriodoSemanaService,

  ) { }

  ngOnInit(): void {
    this.tipoUnidad = parseInt(localStorage.getItem('tipoUnidad'));

    if(localStorage.getItem('descNivel')){
      this.descNivel = localStorage.getItem('descNivel');
    }else{
      this.descNivel = '';
    }
  
    //Suscripcion al observable de estados para obtener su valor cuando cambia
    this.suscServiceEstado = this.estadoService.getEstado$().subscribe((estadoFiltro) => {
      if (estadoFiltro) {
        this.estado = estadoFiltro.nomEntidad;
        this.obtenerFechasPeriodo(estadoFiltro.nomEntidad);
      }
    });
  }

  /*private updateLocalStorage(cveEntidad: string, nomEntidad: string, descripcion: string, ){
    let data: Parametros = {
      cveEntidad: cveEntidad,
      nomEntidad: nomEntidad,
      descripcion: descripcion
    }
    localStorage.setItem('parametros', JSON.stringify(data));
  }*/

  private obtenerFechasPeriodo(nomEntidad: string) {
    this.loadingFecha = true;
    this.fechaPeriodo = new PeriodoSemanal();

    if(nomEntidad === null || nomEntidad === ''){
      return;
    }

    this.suscServicePeriodo = this.servicePeriodo
      .getPeridosSemanas(nomEntidad)
      .subscribe(
        (data) => {
          console.log(">>>>> getPeridosSemanas: consulta-compt.", nomEntidad);          
          if (data && data.length > 0) {
            this.fechaPeriodo = data[0]; 
            this.periodo = data[0]; 
            this.loadingFecha = false;         
          } else {
            this.fechaPeriodo = new PeriodoSemanal();
            this.loadingFecha = false;
          }
        },
        (error: any) => {
          this.loadingFecha = false;
          console.log("Error al cargar fecha de periodo en consulta:", error);
        }
      );
  }


  ngOnDestroy(){

    if(this.suscServiceEstado ){
      this.suscServiceEstado.unsubscribe(); 
    }
  
    if(this.suscServicePeriodo){
      this.suscServicePeriodo.unsubscribe();
    }

  }

}
