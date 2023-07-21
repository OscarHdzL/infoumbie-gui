import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Clues} from '../../model/situacion-actual/Clues';
import {Entidad} from "../../model/situacion-actual/Entidad";
import {Unidades} from "../../model/seguimiento/consultaUnidades";

@Injectable({
  providedIn: 'root'
})
export class SeguiSitActualService {

  private unidad$: BehaviorSubject<Unidades> = new BehaviorSubject<Unidades>(null);

  setUnidad$(unidad: Unidades){
    this.unidad$.next(unidad);
  }

  getUnidad$(): Observable<Unidades>{
    return this.unidad$.asObservable();
  }

}
