import {Component, OnInit, Input, SimpleChanges, OnDestroy} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {EstadoService} from "../../shared/services/seguimiento/estado.service";
import {Router} from "@angular/router";
import {NAVEGACION} from "../../shared/constants/navigation";
import {PeriodoSemanal} from "../../shared/model/seguimiento/periodo-semanal";
import {PeriodoSemanaService} from "../../shared/services/seguimiento/periodo-semana.service";
import {Subscription} from "rxjs";
import {SemanaPeriodoService} from "../../shared/services/seguimiento/semana-periodo.service";

@Component({
  selector: 'app-plan-trabajo',
  templateUrl: './plan-trabajo.component.html',
  styleUrls: ['./plan-trabajo.component.css']
})
export class PlanTrabajoComponent implements OnInit, OnDestroy {

  public estado = '';
  public semana = '1';
  //url:string='https://projectdidt.cloudapps.imss.gob.mx/guihc-visor/project?entidad=';
  //url:string='https://projectdidt-qa.cloudapps.imss.gob.mx/guihc-visor/project?entidad=';
  url:string='';
  urlSafe:SafeResourceUrl;
  estadoAnterior:string='';
  semanaAnterior:string='';
  periodo: PeriodoSemanal;

  private estadoSubscription: Subscription;
  private periodosSubscription: Subscription;
  private semanaSubscription: Subscription;

 
  constructor(private sanitizer: DomSanitizer,
              private estadoService: EstadoService,
              private servicePeriodo: PeriodoSemanaService,
              private router: Router,
              private semanaService: SemanaPeriodoService) {
    
   }

  ngOnInit(): void {
    this.url=this.getEnviroment();
    this.estadoSubscription = this.estadoService.getEstado$().subscribe(estado => {
      this.semanaSubscription = this.semanaService.getSemana$().subscribe(semana => {
        if (estado && semana) {
           this.estado = this.doCapital(estado.nomEntidad);
           this.semana = semana.numSemana.toString();
           let urlAux = this.url+this.estado+'&semana='+this.semana;
           this.urlSafe =  this.sanitizer.bypassSecurityTrustResourceUrl(urlAux);
           console.log('url: ',this.url)
           console.log('urlSafe: ',this.urlSafe)
           this.obtenerFechasPeriodo(this.estado);
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
 }

 ngOnDestroy() {
      if (this.estadoSubscription) {
          this.estadoSubscription.unsubscribe();
      }

      if (this.periodosSubscription) {
          this.periodosSubscription.unsubscribe();
      }

      if (this.semanaSubscription) {
        this.semanaSubscription.unsubscribe();
      }
 }

    public doCapital(str){
     var retorno='';
     var palabras = str.split(' ');
     palabras.forEach((e,i) => {
          if(palabras.length>1){
            if(e!='DE'){
              if(i===palabras.length-1){
                retorno+=e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
              }else{
                retorno+=e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() + '%20';
              }
            }else{
              retorno += e.toLowerCase()+'%20';
            }
          }else{
            retorno+=e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
          }
     }); 
     return retorno;
 }

    obtenerFechasPeriodo(clave: string) {
        this.periodo = new PeriodoSemanal();
        this.periodosSubscription = this.servicePeriodo.getPeridosSemanas(clave).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.periodo = data[0];
                } else {
                }
            },
            (error: any) => {
                console.log("Error al cargar peridos:", error);
            }
        );
    }

 public atras() {
      this.router.navigate([NAVEGACION.seguimiento])
 }


 private getEnviroment(): string {
  let url = document.location.href;
  if(url.includes('localhost') || url.includes('-qa')){
    return 'https://projectdidt-qa.cloudapps.imss.gob.mx/guihc-visor/project?entidad='
  } else if(url.includes('-uat')){
    return 'https://projectdidt.cloudapps.imss.gob.mx/guihc-visor/project?entidad='
  }else{
    return 'https://projectdidt.cloudapps.imss.gob.mx/guihc-visor/project?entidad='
  }
}

}
