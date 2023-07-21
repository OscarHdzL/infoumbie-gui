import { RecursoMaterialGeneral } from './../../model/situacion-actual/recurso-material-general.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { String } from 'typescript-string-operations';
import { APIs } from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class RecursoMaterialGeneralService {

  constructor(public http: HttpClient) { }

  getRecursosMateriales(clvRef: string): Observable<RecursoMaterialGeneral> {
    return this.http.get<RecursoMaterialGeneral>(String.Format(APIs.situacionActual.recursosMateriales, clvRef));
  }

  getRecursosMaterialesDetalle(clvRef: string, metrica: string): Observable<any> {
    return this.http.get<any>(String.Format(APIs.situacionActual.recursosMaterialesDetalle, clvRef, metrica));
  }

}
