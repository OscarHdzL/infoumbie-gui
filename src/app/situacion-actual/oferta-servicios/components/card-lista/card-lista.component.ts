import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-lista',
  templateUrl: './card-lista.component.html',
  styleUrls: ['./card-lista.component.css']
})
export class CardListaComponent implements OnInit {

  @Input() listaEspecialidades: string[] = [];
  @Input() loading: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
