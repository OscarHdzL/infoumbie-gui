
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { ConsultaUnidades, DataRequest, FechaTransferencia, ListadoUnidades, UbicacionClue } from '../../model/seguimiento/consultaUnidades';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: "root",
})
export class ConsultaUnidadesService extends HttpService{
  private banderaRefrescar$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private cambioEstado$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private alertService:AlertService,
  ) { 
    super();
  }

  /*public getUnidades(
    cveClue: number,
    descNivelAtencion: string
  ): Observable<ConsultaUnidades[]> {
    return this.http.get<ConsultaUnidades[]>(
      `${APIs.seguimiento.consultaUnidades}/${cveClue}/${descNivelAtencion}`
    );
  }*/

  public getDetalleUnidades(dataRequest: DataRequest): Observable<ConsultaUnidades[]>{
    return this.http.post<ConsultaUnidades[]>(`${APIs.seguimiento.detalleUnidades}`, dataRequest);
  }

  public obtenListadoUnidades(
    idEntidad: string,
    numeroSemana: number
  ): Observable<ListadoUnidades> {
    return this.http.get<ListadoUnidades>(
      `${APIs.seguimiento.listadoUnidadesPrincipal}/${idEntidad}/${numeroSemana}`
    );
  }

  public saveFechaTransferencia(data:FechaTransferencia):Observable<FechaTransferencia>{
    return this.http.post<FechaTransferencia>(`${APIs.seguimiento.guardarFechaTransferencia}`, data, {headers: this.httpHeaders})
  }

  public setRefrescar(bandera: Boolean){
    this.banderaRefrescar$.next(bandera);
  }

  public getRefrescar$(): Observable<Boolean>{
    return this.banderaRefrescar$.asObservable();
  }

  public setResetFormFiltros(bandera: Boolean){
    console.log("BANDERA RECIBIDA", bandera);
    this.cambioEstado$.next(bandera);
  }

  public resetFormFiltros$(): Observable<Boolean>{
    return this.cambioEstado$.asObservable();
  }

  public getUbicacionClue(cveClue: number): Observable<UbicacionClue>{
    return this.http.get<UbicacionClue>(
      `${APIs.seguimiento.ubicacionClue}/${cveClue}`
    ).pipe(
      catchError(error => {
        this.spinner.hide();
        if(error.error){

        switch(error.error.code){
          case '404':
            this.alertService.showAlertError("No se cuenta con la ubicación de la unidad");
          break;
          case '500':
            this.alertService.showAlertError(error.error.businessMessage);
          break;
        }
        }

        return of(null);

      })
    );
  }

}
