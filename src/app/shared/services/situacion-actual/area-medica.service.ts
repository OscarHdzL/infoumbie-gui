import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { AreaMedica, Camas, Descripcion, ServiciosAgrupados } from '../../model/situacion-actual/AreaMedica';

@Injectable({
  providedIn: 'root'
})
export class AreaMedicaService {

  public listaServicios: ServiciosAgrupados[] = [];

  constructor(
    public http: HttpClient
  ) { }

  getInfoAreaMedica(refClue: string): Observable<any[]>{
    return this.http.get<AreaMedica>(`${APIs.situacionActual.areaMedica}/${refClue}`)
    .pipe(
      
      map((response: AreaMedica) => {
       // console.log("RESP SER INFO CAMAS",response);
        let detalleCamas: Camas = new Camas();
        let listaInfoCamas = [];
        this.listaServicios = [];
        if(response.camas.length > 0){

          response.camas.forEach(cama => {

            switch(cama.metrica){
              case 'Camas sensables':
                detalleCamas.camasCensables = cama.conteo;
              break;
              case 'Camas no sensables':
                detalleCamas.camasNoCensables = cama.conteo;
              break;
              case 'Camas de cuidados intensivos':
                detalleCamas.cuidadosIntensivos = cama.conteo;
              break;
            }

            detalleCamas.totalCamas = response.totalCamas;
            detalleCamas.totalConsultorios = response.totalConsultorios;
            detalleCamas.totalGenerales = response.totalGenerales;
          })
          listaInfoCamas.push(detalleCamas);
          
         /* detalleCamas.camasCensables = response.camas.filter(cama => cama.metrica === 'Camas sensables' ? cama.metrica : 0)[0].conteo;
          detalleCamas.camasNoCensables = response.camas.filter(cama => cama.metrica === 'Camas no sensables' ? cama.metrica : 0)[0].conteo;
          detalleCamas.cuidadosIntensivos = response.camas.filter(cama => cama.metrica === 'Camas de cuidados intensivos' ? cama.metrica : 0)[0].conteo;        
          
          detalleCamas.totalCamas = response.totalCamas;
          detalleCamas.totalConsultorios = response.totalConsultorios;
          detalleCamas.totalGenerales = response.totalGenerales;*/
         
        }else{

          listaInfoCamas = [];

        }

        if(response.lista.length > 0){
          this.clasificarServicios(response.lista);
        }else{
          this.listaServicios = [];
        }

        return [listaInfoCamas, this.listaServicios];
      })
    );
  }

  clasificarServicios(lista: Descripcion[]){
    let arrayTemporal: ServiciosAgrupados[] = [];
    for(var i=0; i<lista.length; i++){
    
	    arrayTemporal = this.listaServicios.filter(resp => resp.tipoServicio == lista[i].tipo);

      //si ya existe un registro ve agrupandodolos e insertando su informacion
      if(arrayTemporal.length>0){
       
        let indice = this.listaServicios[this.listaServicios.indexOf(arrayTemporal[0])]
	     
        indice.informacion.
          push({
            nombre: lista[i].metrica,
            cantidad: lista[i].conteo
          });
          
         indice.total = indice.informacion.reduce((acum, sum) => acum + sum.cantidad,0);

	    }else{

        //sino hay un registro insertalo en un nuevo objeto
        this.listaServicios.push(
          {
            tipoServicio : lista[i].tipo,
            total: lista[i].conteo,
            informacion : [
              {
                nombre: lista[i].metrica,
                cantidad: lista[i].conteo
              }
            ]
          }
        )
      }
	    }

      
     // console.log("DATOS CLASIFICADOS", this.listaServicios);
  }


}
