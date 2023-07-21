import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Clues} from '../../model/situacion-actual/Clues';

@Injectable({
  providedIn: 'root'
})
export class CluesService {

  private clues$: BehaviorSubject<Clues> = new BehaviorSubject<Clues>(null);


  setClues(clues: Clues){
    this.clues$.next(clues);
  }

  getClues$(): Observable<Clues>{
    return this.clues$.asObservable();
  }
}
