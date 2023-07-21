import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminEncuestasService extends HttpService{

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {
    super();
  }

  public enviarDescripcion$: BehaviorSubject<any> = new BehaviorSubject(null);

  public getDescripcion(): Observable<any> { 
    return this.enviarDescripcion$.asObservable(); 
  }
  
  public setDescripcion (descripcion: any){ 
    return this.enviarDescripcion$.next(descripcion);
  }

  public getNivel(){
    return this.http.get(APIs.adminEncuestas.consultaNivel);
  }

  public getAreas(cveModulo: number){
    return this.http.get(`${APIs.adminEncuestas.consultaAreas}/${cveModulo}`);
  }

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
  }

}
