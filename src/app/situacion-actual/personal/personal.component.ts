import {Component, OnDestroy, OnInit} from '@angular/core';
import {SituacionActualService} from "../../shared/services/situacion-actual/situacion-actual.service";
import {PersonalResidentes, PlantillaActual} from "../../shared/model/situacion-actual/Personal";
import {Observable, Subscription} from "rxjs";
import {PersonalService} from "../../shared/services/situacion-actual/personal.service";
import {CluesService} from "../../shared/services/situacion-actual/clues.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public plantillaActual: PlantillaActual = new PlantillaActual();
  public personalResidentes: PersonalResidentes = new PersonalResidentes();

  public loadingPA = false;
  public loadingPR = false;

  private subscriptions : Subscription[] = [];

  constructor(private situacionActualService: SituacionActualService, private personalService: PersonalService, private cluesService: CluesService) { }

  ngOnInit(): void {
    //this.getData('NTSSA001594');
    this.subscriptions.push(
        this.cluesService.getClues$().subscribe(clues =>  {
            console.log('getClues$', clues)
            if (clues) {
                this.getData(clues.refClues);
            }
        })
    );
  }

  getData(refClues: string) {
    this.loadingPA = true;
    this.loadingPR = true;
    this.subscriptions.push(
        this.personalService.getPlantillaActualInfo(refClues).subscribe( response => {
            this.plantillaActual = response;
            this.loadingPA = false;
          }
        )
    )

    this.subscriptions.push(
        this.personalService.getPersonalResidentes(refClues).subscribe(response =>
          {
            this.personalResidentes = response;
            this.loadingPR = false;
          }
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
        subscription => subscription.unsubscribe()
    );
  }


}
