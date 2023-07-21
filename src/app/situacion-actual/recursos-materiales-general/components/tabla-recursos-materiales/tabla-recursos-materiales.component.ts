import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipamiento } from 'src/app/shared/model/situacion-actual/equipamiento.model';

@Component({
  selector: 'app-tabla-recursos-materiales',
  templateUrl: './tabla-recursos-materiales.component.html',
  styleUrls: ['./tabla-recursos-materiales.component.css']
})
export class TablaRecursosMaterialesComponent implements OnInit {

  @Input()
  recursosMaterialesGeneral: Equipamiento[] = [];
  @Output()
  eventSendMetrica = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  showDetalleRecursos(metrica: string): void {
    this.eventSendMetrica.emit(metrica);
  }

}
