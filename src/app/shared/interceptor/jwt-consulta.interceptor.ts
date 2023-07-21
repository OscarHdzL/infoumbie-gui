import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { String } from 'typescript-string-operations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NAVEGACION } from '../constants/navigation';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from '../services/autenticacion/autenticacion.service';


@Injectable()
export class JwtConsultaInterceptor implements HttpInterceptor {

   constructor(private auth: AutenticacionService, private router: Router, private location: Location, private spinner: NgxSpinnerService) { }

   private handleAuthError(err: HttpErrorResponse): Observable<any> {

      if (err.status === 401 || err.status === 403) {
        console.log("Entro err.status === 401 || err.status === 403"); 
      }

      return throwError(err);
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const emptyAuthHeader = String.IsNullOrWhiteSpace(request.headers.get('Authorization'));

      /* Para servicio de restablecer password, no contiene token y se excluye de autorización */
      if (request.headers.get('Anonymous') != undefined) {
         const newHeaders = request.headers.delete('Anonymous')
         const newRequest = request.clone({ headers: newHeaders });
         return next.handle(newRequest);
      }

      if (this.auth.isAuthenticated && this.auth.token != '' && emptyAuthHeader) {
         request = request.clone({
            setHeaders: {
               Authorization: ('bearer ' + this.auth.token).replace("\"", "").replace("\"", "")
            }
         });
      }

      return next.handle(request).pipe(catchError(err => {
         return this.handleAuthError(err);
      }));
   }

}