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
import { PorcentajeMesaModel } from '../../model/MesaEntrega/PorcentajeMesaModel';

@Injectable({
  providedIn: 'root'
})
export class PorcentajesMesaService extends HttpService{

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    super();
  }

  public enviarPorcentajeMesa$: BehaviorSubject<PorcentajeMesaModel> = new BehaviorSubject(null);

  public getPorcentajeMesaActual(): Observable<any> { 
    return this.enviarPorcentajeMesa$.asObservable(); 
  }
  
  public setPorcentajeMesaActual (PorcentajeMesa: PorcentajeMesaModel){ 
    return this.enviarPorcentajeMesa$.next(PorcentajeMesa);
  }

  public getPorcentajeMesa(idMesa: number, idSemana: number){
    return this.http.get<PorcentajeMesaModel>(`${environment.mesaEntregaServices}${APIs.mesaEntrega.consultaPorcentajesMesa1}/${idMesa}${APIs.mesaEntrega.consultaPorcentajesMesa2}/${idSemana}`);
  }

  public guardarEditarPorcentajeMesa(PorcentajeMesa: PorcentajeMesaModel){
    return this.http.post(`${environment.mesaEntregaServices}${APIs.mesaEntrega.porcentajeMesa}`, PorcentajeMesa).pipe();
  }

}
