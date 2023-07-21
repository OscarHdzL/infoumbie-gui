import { Component, Input, OnInit } from '@angular/core';
import { InformacionServicio } from 'src/app/shared/model/situacion-actual/AreaMedica';

@Component({
  selector: 'app-tabla-area-medica',
  templateUrl: './tabla-area-medica.component.html',
  styleUrls: ['./tabla-area-medica.component.css']
})
export class TablaAreaMedicaComponent implements OnInit {

  @Input() listaInformacion: InformacionServicio [] = [];
  constructor(
  ) { }

  ngOnInit(): void {}

}
