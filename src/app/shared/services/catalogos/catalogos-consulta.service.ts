import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { DiagnosticoCIE } from '../../model/catalogos/DiagnosticoCIE';
import { MedicamentoCat } from '../../model/catalogos/MedicamentoCat';
import { Clue, EntidadFederativa } from '../../model/catalogos/EntidadFederativa';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { Jurisdiccion } from '../../model/jurisdiccion/jurisdiccion';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogosConsultaService extends HttpService{

  constructor(private http: HttpClient,
    private autenticacionService: AutenticacionService) {
    super();
  }

  public getDiagnosticosCIE(token:string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })

    return this.http.get<DiagnosticoCIE[]>(`${APIs.catalogos.diagnosticosCIE}`, { observe: 'response', params: null, headers: headers }).pipe();
  }

  public getDiagnosticosCIEByFiltro(token:string ,filtro:string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    return this.http.get<DiagnosticoCIE[]>(`${APIs.catalogos.diagnosticosCIE + '/' + filtro}`, { observe: 'response', params: null, headers: headers }).pipe();
  }

  public getMedicamentosByFiltro(token:string ,filtro:string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    return this.http.get<MedicamentoCat[]>(`${APIs.catalogos.medicamentos + '/' + filtro}`, { observe: 'response', params: null, headers: headers }).pipe();
  }

  public getEntidadesFederativas(token:string ,tipo : number, rol: number){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    let params = new HttpParams()
            .set('tipo', tipo == null || tipo == 0 ? '0' : String(tipo))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol));
    return this.http.get<EntidadFederativa[]>(APIs.catalogos.entidadFederativa, { observe: 'response', params: params, headers: headers }).pipe();
  }

  public getClues(token:string ,idEntidad:any){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    return this.http.get<Clue[]>(APIs.catalogos.cluesBienestar + idEntidad, { observe: 'response', params: null, headers: headers }).pipe();
  }

  public getJurisdiccion(token:string ,idEntidad : number, rol: number){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    let params = new HttpParams()
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol));

    return this.http.get<Jurisdiccion[]>(APIs.catalogos.jurisdiccion, { observe: 'response', params: params, headers: headers }).pipe();
  }

  public getNombreUnidad(token:string ,clues: string , idEntidad : number){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })

    let params = new HttpParams()
        .set('clues', String(clues))
        .set('idEntidad', String(idEntidad));

    return this.http.get(APIs.catalogos.nombreUnidad, {observe: 'response', params: params,headers: headers}).pipe();
  }

  public getCluesByEntidad(token:string , idEntidad : number,  rol: number, jurisdiccion: number, idNivel: number){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })

    let params = new HttpParams()
            .set('idEntidad', String(idEntidad))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('idNivel', idNivel == null || idNivel == 0 ? '0' : String(idNivel));

    return this.http.get(APIs.catalogos.clues, {observe: 'response', params: params,headers: headers}).pipe();
  }

  public getEstadisticas(token:string ,clues: string , nivelAtencion : number, idEntidad: number){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    let params = new HttpParams()
        .set('clues', clues == null || clues == '' ? '' : String(clues)  )
        .set('nivelAtencion', nivelAtencion == null || nivelAtencion == 0 ? '0' : String(nivelAtencion) )
        .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad));

    return this.http.get(APIs.estadisticas.cuestionarios, {observe: 'response', params: params,headers: headers}).pipe();
  }

  public getPreguntasRespuestas(token:string ){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    let params = new HttpParams()
        .set('clues', String(sessionStorage.getItem("refClue")) );
    
    return this.http.get(APIs.estadisticas.preguntas, {observe: 'response', params: params,headers: headers}).pipe();
  }

  public getCedulas(token:string ,clues : string){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })
    let params = new HttpParams()
        .set('clues', clues);

    return this.http.get(APIs.catalogos.cedulas, {observe: 'response', params: params,headers: headers}).pipe();
  }

  public getUnidades(token:string ,idEntidad: number, idJurisdiccion: number,idNivel: number){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })

    let params = new HttpParams()
      .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
      .set('idJurisdiccion', idJurisdiccion == null || idJurisdiccion == 0 ? '0' : String(idJurisdiccion))
      .set('idNivel', idNivel == null || idNivel == 0 ? '0' : String(idNivel) );

      return this.http.get(APIs.catalogos.unidades, {observe: 'response', params: params,headers: headers}).pipe();
  }

  public getPrueba(token:string ){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
    })

    return this.http.get(APIs.catalogos.prueba, {observe: 'response', params: null,headers: headers}).pipe();

  }



}
