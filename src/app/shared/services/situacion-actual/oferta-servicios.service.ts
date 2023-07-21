import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { DetalleServicios, OfertaServicio } from '../../model/situacion-actual/Oferta-Servicio';
import { SharePointService } from './share-point.service';

@Injectable({
  providedIn: 'root'
})
export class OfertaServiciosService extends SharePointService{

  private idCarpOferServ: string = '37115596-54ab-4cad-b15b-839281c93fbc';
  private idCarpOferServCons: string = '78509c88-f58e-4dd9-854c-343c34acdc8e';
  
  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  public getInfoCamas(refClues: string): Observable<OfertaServicio[]>{
    let fields: string[] = ['field_2', 'field_3', 'field_4', 'field_5']
    return this.getData({
      idLista: this.idCarpOferServ,
      fields: fields,
      refClues: refClues
    })
    .pipe(
      map(response => {
        //console.log("RESP OFERTA SERVICIO",response['value']);
        let arrayData: OfertaServicio[] = [];
        
        if(response['value'].length > 0){
          let informacion: any = response['value'][0]['fields'];
          let detalleOfertaServicio : OfertaServicio  = new OfertaServicio();
      
          detalleOfertaServicio.camasCensables = (informacion.hasOwnProperty('field_2') === true ? informacion['field_2'] : 0);
          detalleOfertaServicio.camasNoCensables = (informacion.hasOwnProperty('field_3') === true ? informacion['field_3'] : 0)
          detalleOfertaServicio.especialidades = (informacion.hasOwnProperty('field_5') === true ? informacion['field_5'] : '');
          detalleOfertaServicio.totalCamas = (informacion.hasOwnProperty('field_4') === true ? informacion['field_4'] : '0');
        
          arrayData.push(detalleOfertaServicio);
        }else{
          arrayData = [];
        }
        return arrayData;
      }),
      catchError((error) => {
        console.log(error);
        console.log("Error al generar la respuesta del servicio oferta-servicios");
        return of([]);
      }
    )
    )
  }

   public getConsultorios_Generales(refClues: string): Observable<any>{
    let fields: string[] = ['field_2', 'field_3', 'field_4'];
    return this.getData({
      idLista: this.idCarpOferServCons, 
      fields: fields,
      refClues: refClues
    })
    .pipe(
      map((response: any)  => {
        let listaServicios: DetalleServicios[] = [];

        try{
          response.value.forEach(servicio =>{
            let detalleServicio: DetalleServicios = new DetalleServicios();
            detalleServicio.tipoServicio = servicio['fields']['field_2'];
            detalleServicio.nombreConsultorio = servicio['fields']['field_3'];
            detalleServicio.totalConsultorio = servicio['fields']['field_4'];
            listaServicios.push(detalleServicio);
          })
          /*let valores = response['value'];
          return valores;*/
         
        }catch(error){
          console.log(error);
          throw  throwError('Error al generar la respuesta del servicio oferta-servicios-consultorios');
        }
        return listaServicios;
      })
    )
  }

   /* public getInfoCamas(refClues: string): Observable<any>{
    let params = `?expand=fields(select=field_2, field_3, TotalCamas, field_5)&$filter=(fields/Title eq \'${refClues}\')`
    return this.get(`${environment.urlSharePoint}/${environment.siteSharePoint}/lists/${this.idCarpOferServ}/items${params}`, true)
    .pipe(
      map((resp: any)  => {
        let valores = resp['value'];
        return valores;
      })
      );
  }*/

  /*public getConsultorios_Generales(refClues: string){
    let params = `?expand=fields(select=field_2, field_3, field_4)&$filter=(fields/Title eq \'${refClues}\')`
    return this.get(`${environment.urlSharePoint}/${environment.siteSharePoint}/lists/${this.idCarpOferServCons}/items${params}`, true)
    .pipe(
      map((resp: any)  => {
        let valores = resp['value'];
        return valores;
      })
    )
  }*/
}
