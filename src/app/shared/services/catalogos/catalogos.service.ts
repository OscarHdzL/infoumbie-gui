import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { DiagnosticoCIE } from '../../model/catalogos/DiagnosticoCIE';
import { MedicamentoCat } from '../../model/catalogos/MedicamentoCat';
import { Clue, EntidadFederativa } from '../../model/catalogos/EntidadFederativa';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { Jurisdiccion } from '../../model/jurisdiccion/jurisdiccion';
import {Municipio} from '../../model/situacion-actual/Municipio';
import {Observable} from 'rxjs';
import {Localidad} from '../../model/situacion-actual/Localidad';
import {CluesRequest} from '../../model/situacion-actual/CluesRequest';
import {Clues} from '../../model/situacion-actual/Clues';
import {Entidad} from "../../model/situacion-actual/Entidad";


@Injectable({
  providedIn: 'root'
})
export class CatalogosService extends HttpService{

  constructor(private http: HttpClient,
    private autenticacionService: AutenticacionService) {
    super();
  }

  public getDiagnosticosCIE() {
    return this.http.get<DiagnosticoCIE[]>(`${APIs.catalogos.diagnosticosCIE}`, { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getDiagnosticosCIEByFiltro(filtro:string) {
    return this.http.get<DiagnosticoCIE[]>(`${APIs.catalogos.diagnosticosCIE + '/' + filtro}`, { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getMedicamentosByFiltro(filtro:string) {
    return this.http.get<MedicamentoCat[]>(`${APIs.catalogos.medicamentos + '/' + filtro}`, { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getEntidadesFederativas(tipo : number, rol: number){
    let params = new HttpParams()
            .set('tipo', tipo == null || tipo == 0 ? '0' : String(tipo))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol));
    return this.http.get<EntidadFederativa[]>(APIs.catalogos.entidadFederativa, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
  }

  public getEntidadesFederativasMesaTrabajo(idClues: number,matricula: string){
    let params = new HttpParams()
            .set('idClues', String(idClues))
            .set('matricula', matricula);
    return this.http.get<EntidadFederativa[]>(APIs.catalogos.entidadFederativaMesaTrabajo, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
  }

  public getClues(idEntidad:any){
    return this.http.get<Clue[]>(APIs.catalogos.cluesBienestar + idEntidad, { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getJurisdiccion(idEntidad : number, rol: number){
    let params = new HttpParams()
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol));

    return this.http.get<Jurisdiccion[]>(APIs.catalogos.jurisdiccion, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
  }

  public getNombreUnidad(clues: string , idEntidad : number){

    let params = new HttpParams()
        .set('clues', String(clues))
        .set('idEntidad', String(idEntidad));

    return this.http.get(APIs.catalogos.nombreUnidad, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
  }

  public getCluesByEntidad(idEntidad : number,  rol: number, jurisdiccion: number, idNivel: number){

    let params = new HttpParams()
            .set('idEntidad', String(idEntidad))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('idNivel', idNivel == null || idNivel == 0 ? '0' : String(idNivel));

    return this.http.get(APIs.catalogos.clues, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
  }

  public getEstadisticas(clues: string , nivelAtencion : number, idEntidad: number){
    let params = new HttpParams()
        .set('clues', clues == null || clues == '' ? '' : String(clues)  )
        .set('nivelAtencion', nivelAtencion == null || nivelAtencion == 0 ? '0' : String(nivelAtencion) )
        .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad));

    return this.http.get(APIs.estadisticas.cuestionarios, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
  }

  public getPreguntasRespuestas(){
    let params = new HttpParams()
        .set('clues', String(sessionStorage.getItem("refClue")) );
    
    return this.http.get(APIs.estadisticas.preguntas, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
  }

  public getCedulas(clues : string){
    let params = new HttpParams()
        .set('clues', clues);

    return this.http.get(APIs.catalogos.cedulas, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
  }

  public getUnidades(idEntidad: number, idJurisdiccion: number,idNivel: number){

    let params = new HttpParams()
      .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
      .set('idJurisdiccion', idJurisdiccion == null || idJurisdiccion == 0 ? '0' : String(idJurisdiccion))
      .set('idNivel', idNivel == null || idNivel == 0 ? '0' : String(idNivel) );

      return this.http.get(APIs.catalogos.unidades, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();


  }

  public getMunicipios(cveEntidad: string): Observable<HttpResponse<Municipio[]>> {
    return this.http.get<Municipio[]>(`${APIs.situacionActual.municipios + '/' + cveEntidad}`,
        { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getLocalidades(cveEntidad: string, cveMunicipio: string): Observable<HttpResponse<Localidad[]>> {
    return this.http.get<Localidad[]>(`${APIs.situacionActual.localidades + '/' + cveEntidad + '/' + cveMunicipio}`,
        { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getNivelesAtencion(): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(`${APIs.situacionActual.nivelesAtencion}`,
        { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getCluesSituacionActual(filtros: CluesRequest){
    return this.http.post<Clues[]>(APIs.situacionActual.clues, filtros, { headers: this.httpHeaders }).pipe();
  }

  public getEntidades(): Observable<HttpResponse<Entidad[]>>{
    return this.http.get<Entidad[]>(`${APIs.situacionActual.entidades}`,
        { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }

  public getEntidadesSeguimiento(): Observable<HttpResponse<Entidad[]>>{
    return this.http.get<Entidad[]>(`${APIs.seguimiento.entidades}`,
        { observe: 'response', params: null, headers: this.httpHeaders }).pipe();
  }
}
