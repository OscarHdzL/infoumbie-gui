import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {SituacionActualService} from '../../shared/services/situacion-actual/situacion-actual.service';
import {Responsable} from '../../shared/model/situacion-actual/Responsable';
import {ResponsableService} from '../../shared/services/situacion-actual/responsable.service';
import {CluesService} from "../../shared/services/situacion-actual/clues.service";

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

  public responsable$: Observable<Responsable>;
  public suscClueServ: Subscription;
  public vacio = false;

  constructor(private situacionActualService: SituacionActualService,
              private responsableService: ResponsableService,
              private clueService: CluesService) { }

  ngOnInit(): void {
    this.suscClueServ = this.clueService.getClues$()
        .subscribe(clue => {
            if (clue){
                this.responsable$ = this.responsableService.getResponsablesInfo(clue.refClues);
                this.responsable$.subscribe(resp => {
                    if (resp.responsable === undefined) {
                        this.vacio = true;
                    }else{
                      this.vacio = false;
                    }
                });
            }else{
              this.vacio = true;
            }
            }, ( err: any ) => {
              console.log('Error en el servcio clueService para obtener la refClue', err);
            }
        );
  }

}
