import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { SemanaModel } from '../../model/MesaEntrega/SemanaModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemanasService extends HttpService{

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    super();
  }

  public enviarSemana$: BehaviorSubject<SemanaModel> = new BehaviorSubject(null);

  public getSemana(): Observable<any> { 
    return this.enviarSemana$.asObservable(); 
  }
  
  public setSemana (descripcion: SemanaModel){ 
    return this.enviarSemana$.next(descripcion);
  }

  public getSemanas(){
    return this.http.get<SemanaModel[]>(`${environment.mesaEntregaServices}${APIs.mesaEntrega.consultaSemanas}`);
  }
/* 
  public getRubrosPreguntas(cveArea: number){
    return this.http.get(`${APIs.adminEncuestas.consultaRubrosYPreguntas}/${cveArea}`);
  }

  public guardarEditarArea(area: any){
    return this.http.post(APIs.adminEncuestas.guardarEditarArea, area, {observe: 'response',headers: this.httpHeaders}).pipe();
  }

  public guardarEditarRubro(rubro: any){
    return this.http.post(APIs.adminEncuestas.guardarEditarRubro, rubro, {observe: 'response',headers: this.httpHeaders}).pipe();
  }

  public guardarEditarPregunta(pregunta: any){
    return this.http.post(APIs.adminEncuestas.guardarEditarPregunta, pregunta, {observe: 'response',headers: this.httpHeaders}).pipe();
  }

  public eliminarRubro(rubro: any){
    return this.http.request('delete', APIs.adminEncuestas.eliminarRubro, {body: rubro}).pipe();
  }

  public eliminarPregunta(cvePregunta: any){
    return this.http.delete(`${APIs.adminEncuestas.eliminarPregunta}/${cvePregunta}`).pipe();
  }

  public getTipoRespuestas(){
    return this.http.get(APIs.adminEncuestas.consultarTipoRespuesta);
  }

  public getCatalogoRespuestas(){
    return this.http.get(APIs.adminEncuestas.consultarCatalogoRespuestas);
  }

  public cargarPreguntas(archivo: FormData){
    return this.http.post(APIs.adminEncuestas.cargarPreguntas, archivo, {});
  }


  public getConsultarRespuestasPregunta(cvePregunta: number){
    return this.http.get(`${APIs.adminEncuestas.consultarRespuestasPregunta}/${cvePregunta}`);
  }

  public guardarNuevaRespuesta(respuesta: any){
    return this.http.post(APIs.adminEncuestas.guardarNuevaRespuesta, respuesta, {observe: 'response',headers: this.httpHeaders}).pipe();
  }

  public eliminarArea(cveArea: number){
    return this.http.delete(`${APIs.adminEncuestas.eliminarArea}/${cveArea}`).pipe();
  } */

}
