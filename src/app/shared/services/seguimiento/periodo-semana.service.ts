import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodoSemanal } from '../../model/seguimiento/periodo-semanal';
import { APIs } from '../../constants/endpoints';
import { Porcentajes } from '../../model/seguimiento/porcentajes';

@Injectable({
  providedIn: 'root'
})
export class PeriodoSemanaService {

  constructor(private http: HttpClient) { }

  getPeridosSemanas(estado: string): Observable<PeriodoSemanal[]> {
    return this.http.get<PeriodoSemanal[]>(`${APIs.seguimiento.periodoSemana}/${estado}`);
  }

  getPorcentajes(estado: string, semana: number): Observable<Porcentajes> {
    return this.http.get<Porcentajes>(`${APIs.seguimiento.porcentajes}/${estado}/${semana}`)
  }
  
}
