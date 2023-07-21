import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SituacionActualService} from "../../shared/services/situacion-actual/situacion-actual.service";
import {CluesService} from "../../shared/services/situacion-actual/clues.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NAVEGACION} from "../../shared/constants/navigation";
import {SeguiSitActualService} from "../../shared/services/seguimiento/segui-sit-actual.service";
import {Clues} from "../../shared/model/situacion-actual/Clues";

@Component({
  selector: 'app-situacion-actual',
  templateUrl: './seg-sit-actual.component.html',
  styleUrls: ['./seg-sit-actual.component.css']
})
export class SegSitActualComponent implements OnInit {

  public indexSelected = 1;
  public suscGetToken: Subscription;
  public unidadSubscription: Subscription;
  public nomClue = 'Aqui va el nombre de la clue';
  public clue: Clues = new Clues();

  constructor(
      private situacionActualService: SituacionActualService,
      private clueService: CluesService,
      private seguiSitActualService: SeguiSitActualService,
      private cluesService: CluesService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.unidadSubscription = this.seguiSitActualService.getUnidad$().subscribe(unidad => {
      if ( unidad ) {
        console.log('Unidad', unidad);
        this.clue.refClues = unidad.refClues;
        this.clue.desUrlSharePoint= unidad.desUrlSharePoint;
        this.nomClue = unidad.nomClue;
        this.obtenerToken();
      }
    });
  }

  obtenerToken(){
    this.suscGetToken = this.situacionActualService.getTokenSharePoint()
        .subscribe(token => {
              console.log("REFRESH TOKEN", token);
              this.cluesService.setClues(this.clue);
            },(err: any) => {
              console.log("Error en el servcio getTokenSharepoint", err);
            }
        );
  }

  ngOnDestroy(){
    this.clueService.setClues(null);
    if(this.suscGetToken){
      this.suscGetToken.unsubscribe();
    }
    if (this.unidadSubscription) {
      this.unidadSubscription.unsubscribe();
    }
  }

  atras() {
    this.router.navigate([NAVEGACION.consulta]);
  }

}
