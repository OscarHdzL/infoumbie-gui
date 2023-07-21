import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { SemanaModel } from '../../model/MesaEntrega/SemanaModel';
import { environment } from 'src/environments/environment';
import { AcuerdoModel } from '../../model/MesaEntrega/AcuerdoModel';
import { ComentarioAcuerdoModel } from '../../model/MesaEntrega/ComentarioAcuerdoModel';

@Injectable({
  providedIn: 'root'
})
export class ComentarioAcuerdoService extends HttpService{

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    super();
  }

  public enviarComentarioAcuerdo$: BehaviorSubject<ComentarioAcuerdoModel> = new BehaviorSubject(null);
  public contadorComentarioAcuerdos$: BehaviorSubject<number> = new BehaviorSubject(0);


  public getComentarioAcuerdoActual(): Observable<any> { 
    return this.enviarComentarioAcuerdo$.asObservable(); 
  }
  
  public setComentarioAcuerdoActual (ComentarioAcuerdo: ComentarioAcuerdoModel){ 
    return this.enviarComentarioAcuerdo$.next(ComentarioAcuerdo);
  }


/*   public getContadorComentarioAcuerdosActivos(): Observable<any> { 
    return this.contadorComentarioAcuerdos$.asObservable(); 
    
  }
  public setContadorComentarioAcuerdosActivos (conteo:number){ 
    return this.contadorComentarioAcuerdos$.next(conteo);
  } */
  
  public getComentarioAcuerdos(idAcuerdo: number){
    return this.http.get<ComentarioAcuerdoModel[]>(`${environment.mesaEntregaServices}${APIs.mesaEntrega.consultaComentarioAcuerdo}/${idAcuerdo}`);
  }

  public guardarEditarComentarioAcuerdo(ComentarioAcuerdo: ComentarioAcuerdoModel){
    return this.http.post(`${environment.mesaEntregaServices}${APIs.mesaEntrega.guardarComentarioAcuerdo}`, ComentarioAcuerdo).pipe();
  }


}
