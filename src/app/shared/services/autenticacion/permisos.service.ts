import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap, switchMap } from "rxjs/operators";
import { TOKEN } from "src/app/shared/constants/global";
import { APIs } from "src/app/shared/constants/endpoints";
import jwt_decode from "jwt-decode";
import { UsuarioSesion } from "../../model/session/usuarioSesion";
import { String } from "typescript-string-operations";
import { HttpService } from "../common/http.service";

@Injectable({
  providedIn: "root",
})
export class PermisosService extends HttpService {
  private _permisos: string[];
  private _permisosComponentes: string[];
  private inicializado: boolean = false;
  private inicializadoComponentes: boolean = false;

  constructor(private http: HttpClient) {
    super();
  }

  public consultaPermisos(): Observable<string[]> {
    return this.http.get<string[]>(`${APIs.autorizacion.permisos}`).pipe(
      tap((permisos) => {
        console.log("Permisos del servicio", permisos);
        this.setPermisos(permisos);
      }),
      switchMap((__) =>
        this.http
          .get<string[]>(`${APIs.autorizacion.permisosComponentes}`)
          .pipe(
            tap((permisosComponentes) => {
              console.log("Permisos de componentes", permisosComponentes);
              this.setPermisosComponentes(permisosComponentes);
            })
          )
      )
    );
  }

  public hasPermiso(permiso: string): boolean {
    let permisos: string[] = this.getPermisos();
    if (permisos && permisos.length > 0) {
      let permisoFind = permisos.find((p) => p === permiso);
      if (permisoFind) {
        return true;
      }
    }
    return false;
  }

  public hasPermisoComponente(permisoComponente: string): boolean {
    let permisosComponentes: string[] = this.getPermisosComponentes();
    if (permisosComponentes && permisosComponentes.length > 0) {
      let permisoFind = permisosComponentes.find(
        (p) => p === permisoComponente
      );
      if (permisoFind) {
        return true;
      }
    }
    return false;
  }

  private setPermisos(permisos: string[]) {
    if (permisos) {
      this._permisos = permisos;
      this.inicializado = true;
      sessionStorage.setItem("permisos", btoa(JSON.stringify(permisos)));
    }
  }

  public setPermisosComponentes(permisosComponentes: string[]) {
    if (permisosComponentes) {
      this._permisosComponentes = permisosComponentes;
      this.inicializadoComponentes = true;
      sessionStorage.setItem(
        "permisosComponentes",
        btoa(JSON.stringify(permisosComponentes))
      );
      console.log("PERMISOS COMPONENTES AGREGADADOS: ", this.getPermisosComponentes());
    }
  }

  private getPermisos(): string[] {
    if (this.inicializado) {
      return this._permisos;
    }

    this._permisos = JSON.parse(atob(sessionStorage.getItem("permisos")));
    return this._permisos;
  }

  private getPermisosComponentes(): string[] {
    if (this.inicializadoComponentes) {
      return this._permisosComponentes;
    }

    this._permisosComponentes = JSON.parse(
      atob(sessionStorage.getItem("permisosComponentes"))
    );
    return this._permisosComponentes;
  }

  public habilitaDeshabilitaComponente(
    habilitar: boolean,
    nombreComponente: string
  ): Observable<any> {
    let url: string = "";
    if (habilitar) {
      url = `${APIs.autorizacion.habilitaPermisoComponente}/${nombreComponente}`;
    } else {
      url = `${APIs.autorizacion.deshabilitaPermisoComponente}/${nombreComponente}`;
    }
    return this.http.put(url, {});
  }
}
