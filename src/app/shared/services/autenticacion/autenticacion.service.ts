import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TOKEN } from 'src/app/shared/constants/global';
import { APIs } from 'src/app/shared/constants/endpoints';
import jwt_decode from 'jwt-decode';
import { UsuarioSesion } from '../../model/session/usuarioSesion';
import { String } from 'typescript-string-operations';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService extends HttpService{

  private _token : string;
  private _refresh : string;
  private _usuarioSesion : UsuarioSesion;

  constructor(private http: HttpClient) {
    super();
  }

  public get usuarioSesion(): UsuarioSesion {
    if (this._usuarioSesion != null) {
      return JSON.parse(decodeURIComponent(JSON.stringify(this._usuarioSesion)));
    } else if (this._usuarioSesion == null && sessionStorage.getItem('usuarioSesion') != null) {
      this._usuarioSesion = JSON.parse(decodeURIComponent(sessionStorage.getItem('usuarioSesion'))) as UsuarioSesion;
      return this._usuarioSesion;
    }
    return new UsuarioSesion();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public get refresh(): string {
    if (this._refresh != null) {
      return this._refresh;
    } else if (this._refresh == null && sessionStorage.getItem('refresh_token') != null) {
      this._refresh = sessionStorage.getItem('refresh_token');
      return this._refresh;
    }
    return null;
  }

  public autenticacion(usuario: string, password: string): Observable<any> {
    const credenciales = "ZW5jdWVzdGEtZ3VpOjFtc3NFTkMqMDE=";//btoa(TOKEN.user + ':' + TOKEN.password);
    //const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 'Authorization': 'Basic ' + credenciales });
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'Basic ' + credenciales });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario);
    params.set('password', password);

    /*return this.http.post<any>("http://localhost:9010"+APIs.autenticacion.login+"?"+ params.toString()+"&scope=read", { headers: httpHeaders }).pipe(map((response: any) => {
      console.log("que onda"+APIs.autenticacion.login+"  2"+params.toString());
      this.guardarUsuario(response.access_token);
      this.guardarToken(response.access_token);
      return response;
    },
      catchError(e => {
        return throwError(e);
      })));*/
      return this.http.post<any>("http://localhost:9010"+APIs.autenticacion.login+"?"+ params.toString()+"&scope=read", {  }).pipe(map((response: any) => {
      console.log("que onda"+APIs.autenticacion.login+"  2"+params.toString());
      this.guardarUsuario(response.access_token);
      this.guardarToken(response.access_token);
      return response;
    },
      catchError(e => {
        return throwError(e);
      })));
  }

  public cambiarContrasenaPrimerInicio(nombre: string, primerApellido: string, segundoApellido : string, cveMatricula: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('primerApellido', primerApellido)
      .set('segundoApellido', segundoApellido)
      .set('matricula', cveMatricula)
      .set('refClave', password);

    return this.http.put<any>(String.Format(`${APIs.autenticacion.cambioContrasenaPrimerInicio}`, this.usuarioSesion.cveUsuario), '', {observe: 'response', params: params, headers: this.httpHeaders}).pipe(
      (response: any) => {
        return response;
      }
    );
  }

  public restablecerContrasena(idClues: string, idEntidad : number){

    return this.http.put<any>(String.Format(`${APIs.autenticacion.restablecer}`, idClues), '', {observe: 'response', params: null, headers: this.httpHeaders}).pipe(
      (response: any) => {
        return response;
      }
    );

  }

  public guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuarioSesion = new UsuarioSesion(payload);
    let re = /null/gi;
    this._usuarioSesion.nombrePersonal = this._usuarioSesion.nombrePersonal.replace(re, '');
    sessionStorage.setItem('usuarioSesion', JSON.stringify(this._usuarioSesion));
  }

  public guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', JSON.stringify(this._token));
  }

  public guardarRefresh(token: string): void {
    this._refresh = token;
    sessionStorage.setItem('refresh_token', JSON.stringify(this._refresh));
  }

  public obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return jwt_decode(accessToken);
    }
    return null;
  }

  public isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);

    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  public hasRole(roles: string[]): boolean {
    let hasRole = false;

    roles.forEach(role => {
      if (this.usuarioSesion.authorities.includes(role)) {
        hasRole = true;
      }
    });
    return hasRole;
  }

  public logout(): void {
    this._token = null;
    this._refresh = null;
    this._usuarioSesion = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('usuarioSesion');
    sessionStorage.removeItem('idClues');
    sessionStorage.removeItem('idModulo');
    sessionStorage.removeItem('estadoStr');
    sessionStorage.removeItem('estado');
  }

}
