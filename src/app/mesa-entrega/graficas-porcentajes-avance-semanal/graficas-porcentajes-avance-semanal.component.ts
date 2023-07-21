import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas-porcentajes-avance-semanal',
  templateUrl: './graficas-porcentajes-avance-semanal.component.html',
  styleUrls: ['./graficas-porcentajes-avance-semanal.component.css']
})
export class GraficasPorcentajesAvanceSemanalComponent implements OnInit {
  progress: number = 50;
  progress2: number = 70;
  progress3: number = 0;
  constructor() { }

  ngOnInit() {
  }
}
