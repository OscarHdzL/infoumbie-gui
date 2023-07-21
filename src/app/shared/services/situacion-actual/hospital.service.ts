import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../../model/situacion-actual/hospital';
import { SharePointService } from './share-point.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends SharePointService {

  private idCarpHospital: string = 'f78921b0-038c-4d02-9da7-9f56039d6fa5';
  constructor(
    public http: HttpClient) {
    super(http);
  }

  public getUrlImagenes(ruta: string, carpeta: string) {
    return this.get(`${environment.urlGetUrlsImagenes}:/${ruta}/${carpeta}:/children`);
  }

  public getImagenes(link: string) {
    return this.http.get(`${link}`, { observe: 'response', responseType: 'blob' })
  }

  /*public getInfoHospital(refClues: string): Observable<any>{
    let params = `?expand=fields(select=field_1, field_2, field_3, field_4, field_5)&$filter=(fields/Title eq \'${refClues}\')`
    return this.get(`${environment.urlSharePoint}/${environment.siteSharePoint}/lists/${this.idCarpOferHospital}/items${params}`, true)
    .pipe(
      map((resp: any)  => {
        let valores = resp['value'];
        return valores;
      })
    )
  }*/

  public getInfoHospital(refClues: string): Observable<Hospital[]>{
    let fields: string [] = ['field_1', 'field_5', 'Acci_x00f3_n_x0020_Comunitaria', 'Residentes'];
    return this.getData({
      idLista: this.idCarpHospital,
      fields: fields,
      refClues: refClues
    })
    .pipe(
      map(response  => {
        let arrayData: Hospital[] = [];
  
        if(response['value'].length > 0){
          let informacion: any = response['value'][0]['fields'];
          let detalleInfoHospital : Hospital  = new Hospital();
          detalleInfoHospital.nomHospital = (informacion.hasOwnProperty('field_1') === true ? informacion['field_1'] : '');
          detalleInfoHospital.notas = (informacion.hasOwnProperty('field_5') === true ? informacion['field_5'] : '')
          detalleInfoHospital.acciones = (informacion.hasOwnProperty('Acci_x00f3_n_x0020_Comunitaria') === true ? informacion['Acci_x00f3_n_x0020_Comunitaria'] : '');
          detalleInfoHospital.residentes = (informacion.hasOwnProperty('Residentes') === true ? informacion['Residentes'] : '');
          arrayData.push(detalleInfoHospital);
        }else{
          arrayData = [];
        }

        return arrayData;
        //let valores = resp['value'];
        //return valores;
      }),
      catchError((error) => {
       console.log(error);
       console.log("Error al generar la respuesta del servicio del Hospital");
       return of([]);
      }
    )
    )
  }

}
