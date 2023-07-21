import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sin-resultados',
  templateUrl: './sin-resultados.component.html',
  styleUrls: ['./sin-resultados.component.css']
})
export class SinResultadosComponent implements OnInit {

  @Input()
  public tipo = '';

  @Input()
  public titulo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
