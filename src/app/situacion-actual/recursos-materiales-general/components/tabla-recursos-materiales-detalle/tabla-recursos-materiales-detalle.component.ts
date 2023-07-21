import { Component, Input, OnInit } from '@angular/core';
import { EquipamientoDetalle } from 'src/app/shared/model/situacion-actual/equipamiento-detalle.model';

@Component({
  selector: 'app-tabla-recursos-materiales-detalle',
  templateUrl: './tabla-recursos-materiales-detalle.component.html',
  styleUrls: ['./tabla-recursos-materiales-detalle.component.css']
})
export class TablaRecursosMaterialesDetalleComponent implements OnInit {

  @Input()
  recMatGenDet: EquipamientoDetalle;

  constructor() { }

  ngOnInit(): void {
  }

}
