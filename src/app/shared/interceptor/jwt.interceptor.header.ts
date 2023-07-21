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
export class JwtInterceptorHeader implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // Clone the request to add the new header
     const clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Basic ZW5jdWVzdGEtZ3VpOjFtc3NFTkMqMDE=') });
 
     // Pass the cloned request instead of the original request to the next handle
     return next.handle(clonedRequest);
   }
 }