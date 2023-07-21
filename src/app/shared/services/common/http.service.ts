import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timer, of } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class HttpService {

   constructor() { }
   

   public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

   public httpHeadersAnon = new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymous': '' });

}

/* Para política de reintentos */
const genericRetryStrategy = ({
   maxRetryAttempts = 3,
   scalingDuration = 1000,
   excludedStatusCodes = []
}: {
   maxRetryAttempts?: number,
   scalingDuration?: number,
   excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
   return attempts.pipe(
      mergeMap((error, i) => {
         let retryAttempt = i + 1;
         if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
            return throwError(error);
         }
         return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => { })
   );
};
