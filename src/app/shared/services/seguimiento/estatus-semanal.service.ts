import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APIs } from 'src/app/shared/constants/endpoints';
import { HttpService } from '../common/http.service';
import { Observable } from "rxjs";
import { EstatusEntidadFederativa } from '../../model/estatus-entidad-federativa/estatus-entidad-federativa';

@Injectable({
  providedIn: 'root'
})
export class EstatusEntidadFederativaService extends HttpService{

  constructor(private http: HttpClient) {
    super();
  }

  public postGuardarComentario(request: EstatusEntidadFederativa) {
    return this.http.post<any>(APIs.seguimiento.estatusSemanalEntidadFederativa, request, { headers: this.httpHeaders }).pipe();
  }

  getEstatusSemanal(
    desSemana: number,
    cveEntidad: string,
  ): Observable<EstatusEntidadFederativa> {
    return this.http.get<EstatusEntidadFederativa>(
      `${APIs.seguimiento.obtieneEstatusSemanalEntidadFederativa}/${cveEntidad}/${desSemana}`
    );
  }

}
