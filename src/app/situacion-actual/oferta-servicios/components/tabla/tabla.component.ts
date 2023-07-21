import { Component, Input, OnInit } from '@angular/core';
import { InformacionServicio } from 'src/app/shared/model/situacion-actual/Oferta-Servicio';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() listInformacion: InformacionServicio [] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
