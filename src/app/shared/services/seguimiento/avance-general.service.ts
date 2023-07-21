import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import {String} from "typescript-string-operations";

@Injectable({
  providedIn: 'root'
})
export class AvanceGeneralService {

  constructor(private http: HttpClient) { }

  getAvanceGeneral(): Observable<any> {
    return this.http.get(String.Format(APIs.seguimiento.obtieneDatosAvanceGeneral))
    .pipe(
      map((response:any) => {
          return response
      }),tap(data => console.log(data)) 
    )
  }
}
 