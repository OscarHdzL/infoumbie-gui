import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Clues} from '../../model/situacion-actual/Clues';
import {Entidad} from "../../model/situacion-actual/Entidad";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private estado$: BehaviorSubject<Entidad> = new BehaviorSubject<Entidad>(null);
  private estadoStr$: Subject<string> =  new Subject<string>();

  setEstado(estado: Entidad){
    console.log('Estado en Observable', estado)
    this.estado$.next(estado);
  }

  getEstado$(): Observable<Entidad>{
    return this.estado$.asObservable();
  }

  setEstadoStr$(estado: string){
    this.estadoStr$.next(estado);
  }

  getEstadoStr$(): Observable<string>{
    return this.estadoStr$.asObservable();
  }

  setEstados(estados: Entidad[]) {
    sessionStorage.setItem('estadosArray', JSON.stringify(estados));
  }

  getEstados(): Entidad[] {
    if (sessionStorage.getItem('estadosArray')) {
      const estados:Entidad[] = JSON.parse(sessionStorage.getItem('estadosArray'));
      return estados;
    }
    return null;
  }
}
