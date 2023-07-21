import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Semana } from '../../model/seguimiento/semana';

@Injectable({
  providedIn: 'root'
})
export class SemanaPeriodoService {

  
  private semana$: BehaviorSubject<Semana> = new BehaviorSubject<Semana>(null);

  constructor() { }


  setSemana(semana: Semana){
    this.semana$.next(semana);
  }

  getSemana$(): Observable<Semana>{
    return this.semana$.asObservable();
  }
}
