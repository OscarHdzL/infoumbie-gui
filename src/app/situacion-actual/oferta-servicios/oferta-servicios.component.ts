import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetalleServicios, OfertaServicio, ServiciosAgrupados } from 'src/app/shared/model/situacion-actual/Oferta-Servicio';
import { CluesService } from 'src/app/shared/services/situacion-actual/clues.service';
import { OfertaServiciosService } from 'src/app/shared/services/situacion-actual/oferta-servicios.service';

@Component({
  selector: 'app-oferta-servicios',
  templateUrl: './oferta-servicios.component.html',
  styleUrls: ['./oferta-servicios.component.css']
})
export class OfertaServiciosComponent implements OnInit, OnDestroy {

  public infoCamas: OfertaServicio = new OfertaServicio();
  public totalInfoCamas: OfertaServicio[] = [];
  public suscServInfoCamas: Subscription;
  public suscServCons_Gener: Subscription;
 
  public listServicios: ServiciosAgrupados[] = [];
  public arrayTemporal: ServiciosAgrupados[] = [];
  public listaEspecialidades: string[] = [];
  public loading: boolean;
  public suscClueServ: Subscription;

  constructor(
    private ofertaServiciosService: OfertaServiciosService,
    private clueService: CluesService
  ) { }

  ngOnInit(): void{
   this.suscClueServ = this.clueService.getClues$()
    .subscribe(clue => {
      if(clue){
        this.listServicios = [];
        this.totalInfoCamas = [];
        this.listaEspecialidades = [];
        this.loading = true;
        this.informacionCamas(clue.refClues);
        this.informacionServicios(clue.refClues);
      }else{
        this.listServicios = [];
        this.totalInfoCamas = [];
        this.listaEspecialidades = [];
        this.infoCamas = new OfertaServicio();
        this.loading = false;
      }
     
    },(err: any) => {
      this.loading = false;
      console.log("Error en el servcio clueService para obtener la refClue", err);
    }
    )

  }

  informacionCamas(refClue: string){
    this.suscServInfoCamas = this.ofertaServiciosService.getInfoCamas(refClue)
    .subscribe( response => {
      this.totalInfoCamas = response;

      if(this.totalInfoCamas.length > 0){

        this.infoCamas.camasCensables = this.totalInfoCamas[0].camasCensables;
        this.infoCamas.camasNoCensables = this.totalInfoCamas[0].camasNoCensables;
        this.infoCamas.especialidades = this.totalInfoCamas[0].especialidades;
        this.infoCamas.totalCamas = this.totalInfoCamas[0].totalCamas;

        if(this.infoCamas.especialidades != ''){
          let cadenaLimpia =  this.infoCamas.especialidades.replace(/[•\t]/g,"");
          this.listaEspecialidades = cadenaLimpia.split('\n');
        }else{
          this.listaEspecialidades = [];
        }
      }else{
        this.totalInfoCamas = [];
        this.listaEspecialidades = [];
      }
   
      this.loading = false;
    },(err: any) => {
      this.loading = false;
      console.log("Error en el servicio getInfoCamas", err);
    }
    );
  }

  informacionServicios(refClue: string){
    this.suscServCons_Gener = this.ofertaServiciosService.getConsultorios_Generales(refClue)
    .subscribe(data => {
      if(data.length > 0){
        this.clasificar(data);  
      }else{
        this.listServicios = [];
      }
    
    },(err: any) => {
      console.log("Error en el servicio getConsultorios_Generales", err);
    }
    );
  }


  clasificar(datos: DetalleServicios[]){

   for(var i=0; i<datos.length; i++){
    
	    this.arrayTemporal = this.listServicios.filter(resp => resp.tipoServicio == datos[i].tipoServicio);

      //si ya existe un registro ve agrupandodolos e insertando su informacion
      if(this.arrayTemporal.length>0){
       
        let indice = this.listServicios[this.listServicios.indexOf(this.arrayTemporal[0])]
	     
        indice.informacion.
          push({
            nombre: datos[i].nombreConsultorio,
            cantidad: datos[i].totalConsultorio
          });
          
         indice.total = indice.informacion.reduce((acum, sum) => acum + sum.cantidad,0);

	    }else{

        //sino hay un registro insertalo en un nuevo objeto
        this.listServicios.push(
          {
            tipoServicio : datos[i].tipoServicio,
            total: datos[i].totalConsultorio,
            informacion : [
              {
                nombre: datos[i].nombreConsultorio,
                cantidad: datos[i].totalConsultorio
              }
            ]
          }
        )
      }
	    }
     
      console.log("SERVICIOS",this.listServicios);

     /* this.nuevoArray.forEach(element =>{
        console.log("ELE", element);
        let total=element.informacion.reduce((acum, sum) => acum + sum.cantidad,0);
       // this.totales.push(total);
       element.total=total;
       console.log(element.total);
      })*/
	}

  ngOnDestroy(): void{
   if(this.suscClueServ){
     this.suscClueServ.unsubscribe();
   }
    
    //(this.suscServInfoCamas == null || '' ? this.suscServInfoCamas : this.suscServInfoCamas.unsubscribe());
    //(this.suscServCons_Gener == null || '' ? this.suscServCons_Gener : this.suscServCons_Gener.unsubscribe());
  }

}
