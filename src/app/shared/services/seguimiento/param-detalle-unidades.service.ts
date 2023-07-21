import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Parametros } from '../../model/seguimiento/consultaUnidades';

@Injectable({
  providedIn: 'root'
})
export class ParamDetalleUnidadesService {
  private dataParametros$: BehaviorSubject<Parametros> = new BehaviorSubject<Parametros>(new Parametros());

  constructor(
  ) { 
    console.log("PARAM SERVICE", this.getParametros$());
  }

  public setParametros(parametros: Parametros){
    console.log('Parametros en Observable', parametros)
    this.dataParametros$.next(parametros);
  }

  public getParametros$(): Observable<Parametros>{
    return this.dataParametros$.asObservable();
  }

  public getValue$(): Parametros{
    return this.dataParametros$.getValue();
  }
}
