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
export class JwtInterceptor implements HttpInterceptor {

   

   constructor(private auth: AutenticacionService, private router: Router, private location: Location, private spinner: NgxSpinnerService) { }

   private handleAuthError(err: HttpErrorResponse) {

   }
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      return next.handle(request);
   }
   
}