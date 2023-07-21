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
export class CatalogosConsultaPublicService extends HttpService{

  constructor(private http: HttpClient,
    private autenticacionService: AutenticacionService) {
    super();
  }

  public getEntidadesFederativas(tipo : number, rol: number){
    let params = new HttpParams()
            .set('tipo', tipo == null || tipo == 0 ? '0' : String(tipo))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol));
    return this.http.get<EntidadFederativa[]>(APIs.catalogos_public.entidadFederativaPublic, { observe: 'response', params: params, headers: this.httpHeadersAnon }).pipe();
  }

  public getJurisdiccion(idEntidad : number, rol: number){
    let params = new HttpParams()
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol));

    return this.http.get<Jurisdiccion[]>(APIs.catalogos_public.jurisdiccionPublic, { observe: 'response', params: params, headers: this.httpHeadersAnon }).pipe();
  }


  public getCluesByEntidad(idEntidad : number,  rol: number, jurisdiccion: number, idNivel: number){

    let params = new HttpParams()
            .set('idEntidad', String(idEntidad))
            .set('rol', rol == null || rol == 0 ? '0' : String(rol))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('idNivel', idNivel == null || idNivel == 0 ? '0' : String(idNivel));

    return this.http.get(APIs.catalogos_public.cluesPublic, {observe: 'response', params: params,headers: this.httpHeadersAnon}).pipe();
  }

}