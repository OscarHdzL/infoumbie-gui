import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecursosMaterialesService} from "../../shared/services/situacion-actual/recursos-materiales.service";
import {catchError} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {DetalleRecursosMateriales, RecursosMateriales} from "../../shared/model/situacion-actual/RecursosMateriales";
import {CluesService} from "../../shared/services/situacion-actual/clues.service";
import {Equipamiento, RecMatEquiamiento} from "../../shared/model/situacion-actual/equipamiento.model";

@Component({
  selector: 'app-recursos-materiales',
  templateUrl: './recursos-materiales.component.html',
  styleUrls: ['./recursos-materiales.component.css']
})
export class RecursosMaterialesComponent implements OnInit, OnDestroy {

  public loading = false;
  public equipamiento: RecMatEquiamiento[] = null;

  public equipamiento1: RecMatEquiamiento[];
  public equipamiento2: RecMatEquiamiento[];
  public subscriptionEquipamiento = new Subscription();
  public subscriptionArea = new Subscription();
  public registrosEquipamiento = 0;
  public mas = false;
  public totalEquipamiento: number = 0;
  public recursosMateriales: RecursosMateriales = null;

  constructor(private recursosMaterialesService: RecursosMaterialesService, private clueService: CluesService) {

  }

  ngOnInit(): void {
    console.log('RecursosMaterialesComponent1');
    this.clueService.getClues$().subscribe(clues => {
      if (clues) {
        this.getData(clues.refClues);
        //this.getData('BSSSA001380');
      }
    });
    console.log('RecursosMaterialesComponent2');
  }

  ngOnDestroy(): void {
    if (this.subscriptionEquipamiento) {
      this.subscriptionEquipamiento.unsubscribe();
    }

    if (this.subscriptionArea) {
      this.subscriptionArea.unsubscribe();
    }
  }



  getData(refClues: string) {
    this.loading = true;

    this.subscriptionArea = this.recursosMaterialesService.getRecursosMaterialesInfo(refClues).subscribe(response => {
      this.recursosMateriales = response;
    });

    this.subscriptionEquipamiento = this.recursosMaterialesService.getEquipamiento(refClues).subscribe(response =>  {
      this.equipamiento = response;
      this.registrosEquipamiento = this.equipamiento.length;

      this.totalEquipamiento = this.equipamiento.reduce((total, equipo) => total = total + equipo.numCantidad, 0);

      this.equipamiento1 = this.equipamiento.slice(0, 10);
      this.equipamiento2 = this.equipamiento.slice(10, 21);

      this.loading = false

      if (this.registrosEquipamiento > 20) {
        this.mas = true;
      }
    });
  }

  verMas() {
    let mitad  = Math.floor(this.registrosEquipamiento/2);

    this.equipamiento1 = this.equipamiento.slice(0, mitad+1);
    this.equipamiento2 = this.equipamiento.slice(mitad+1, this.registrosEquipamiento+1);
    this.mas = false;
  }

  verMenos() {
    this.equipamiento1 = this.equipamiento.slice(0, 10);
    this.equipamiento2 = this.equipamiento.slice(11, 21);
    this.mas = true;
  }

}
