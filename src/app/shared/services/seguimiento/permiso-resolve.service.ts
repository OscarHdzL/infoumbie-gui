import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {PermisosService} from "../autenticacion/permisos.service";

@Injectable({
  providedIn: 'root'
})
export class PermisoResolveService {

  constructor(private permisosService: PermisosService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<string[]> {
    return this.permisosService.consultaPermisos();
  }
}
