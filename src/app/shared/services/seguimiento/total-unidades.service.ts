import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../../constants/endpoints';
import { TotalUnidades } from '../../model/seguimiento/totalUnidades';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class TotalUnidadesService extends HttpService{
 
  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public getTotalUnidades(cveEntidad, nivelAtencion: any): Observable<TotalUnidades[]>{
    
    console.log("VAR NIVEL ATENCION EN SERVICIO", nivelAtencion);
    let params = new HttpParams();

    params = params.append('cveEntidad', cveEntidad);

    if(nivelAtencion!=='todos'){
      params = params.append('nivelAtencion', nivelAtencion);
    }

    return this.http.get<TotalUnidades[]>(`${APIs.seguimiento.totalUnidades}/`, {params: params})
  }

  public getCatalogoNiveles(): Observable<string []>{
    return this.http.get<string []>(`${APIs.seguimiento.catalogoNiveles}/nivelesAtencion`);
  }
}
