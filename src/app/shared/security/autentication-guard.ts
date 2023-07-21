import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuardGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.autenticacionService.isAuthenticated()) {
        if (this.isTokenExpirado()) {
          this.autenticacionService.logout();
          // window.location.href = NAVEGACION.infcovidLogin;
          return false;
        }



        // console.log("next ", next);
        let roles = next.data['roles'] as string[];
        if (!this.autenticacionService.hasRole(roles)) {
          
          window.location.href = "/login";
          return false;
        }



        return true;
      }else{
        window.location.href = "/login";
      }

    return false;
  }

  isTokenExpirado(): boolean {
    let token = this.autenticacionService.token;
    let payload = this.autenticacionService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }

}
