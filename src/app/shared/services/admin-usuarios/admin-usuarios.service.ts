import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuariosService extends HttpService{

  constructor(private http: HttpClient,
      private autenticacionService: AutenticacionService) {
      super();
  }

  public getUsuarios(strFilter: string , pageNo: number, pageSize: number){
    let params = new HttpParams()
        .set('strFilter', String(strFilter) )
        .set('pageNo', String(pageNo) )
        .set('pageSize', String(pageSize) );
    return this.http.get(APIs.adminUsuarios.usuarios, {observe: 'response', params: params ,headers: this.httpHeaders}).pipe();
  }

  public putUsuarios(usuario: any,password: any){
    let params = new HttpParams()
        .set('password', String(password) );
    return this.http.put(APIs.adminUsuarios.usuarios, usuario, {observe: 'response',params:params,headers: this.httpHeaders}).pipe();
  }

  public enviarExcelUsuarios(archivo: FormData){
    let params = new HttpParams()
    return this.http.post(`${APIs.adminUsuarios.usuariosCarga}`, archivo, {observe: 'response', params: params}).pipe();
  }

  public getCluesAsignadasUsuario(idUsuario: number,pageNo: number, pageSize: number){
    let params = new HttpParams()
        .set('pageNo', String(pageNo) )
        .set('pageSize', String(pageSize) );
    return this.http.get(APIs.adminUsuarios.usuarios+'/'+idUsuario+'/clues', {observe: 'response', params: params, headers: this.httpHeaders}).pipe();
  }

  public getPerfilesUsuario(){
    return this.http.get(APIs.adminUsuarios.usuarios+'/perfiles', {observe: 'response',headers: this.httpHeaders}).pipe();
  }

  public getAdminUsuariosById(idUsuario: number){
    return this.http.get(APIs.adminUsuarios.usuarios+'/'+idUsuario, {observe: 'response',headers: this.httpHeaders}).pipe();
  }

  public getCluesByEntidad(idEntidad){
    let params = new HttpParams()
      .set('idEntidad', String(idEntidad) );
    return this.http.get(APIs.adminUsuarios.usuariosClues, {observe: 'response', params: params, headers: this.httpHeaders}).pipe();
  }

  public updateUsuarioCluesAsignacion(data: any){
    return this.http.post(APIs.adminUsuarios.usuarios+'/clues/asignacion', data, {observe: 'response',headers: this.httpHeaders}).pipe();
  } 



}
