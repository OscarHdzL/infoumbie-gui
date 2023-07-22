import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { SemanaModel } from '../../model/MesaEntrega/SemanaModel';
import { environment } from 'src/environments/environment';
import { AcuerdoAuxModel, AcuerdoModel } from '../../model/MesaEntrega/AcuerdoModel';

@Injectable({
  providedIn: 'root'
})
export class AcuerdosService extends HttpService{

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    super();
  }

  public enviarAcuerdo$: BehaviorSubject<AcuerdoModel> = new BehaviorSubject(null);
  public contadorAcuerdos$: BehaviorSubject<number> = new BehaviorSubject(0);


  public getAcuerdoActual(): Observable<any> { 
    return this.enviarAcuerdo$.asObservable(); 
  }
  
  public setAcuerdoActual (acuerdo: AcuerdoModel){ 
    return this.enviarAcuerdo$.next(acuerdo);
  }


  public getContadorAcuerdosActivos(): Observable<any> { 
    return this.contadorAcuerdos$.asObservable(); 
    
  }
  public setContadorAcuerdosActivos (conteo:number){ 
    return this.contadorAcuerdos$.next(conteo);
  }
  public getAcuerdos(idMesa: number, idSemana: number){
    return this.http.get<AcuerdoModel[]>(`${environment.mesaEntregaServices}${APIs.mesaEntrega.acuerdos}?idMesa=${idMesa}&idSemana=${idSemana}`);
  }

  public guardarEditarAcuerdo(acuerdo: AcuerdoModel){
    return this.http.post(`${environment.mesaEntregaServices}${APIs.mesaEntrega.guardarAcuerdos}`, acuerdo).pipe();
  }

  public eliminarAcuerdo(idAcuerdo: number){
    return this.http.delete(`${environment.mesaEntregaServices}${APIs.mesaEntrega.acuerdos}/${idAcuerdo}`).pipe();
  }

}
