import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-por-confirmar',
  templateUrl: './filtro-por-confirmar.component.html',
  styleUrls: ['./filtro-por-confirmar.component.css']
})
export class FiltroPorConfirmarComponent implements OnInit {

  constructor() { }

  public palabra = new FormControl();
  @Output() public valorPalabra = new EventEmitter();

  ngOnInit(): void {
  }

  public buscar(){
    this.valorPalabra.emit(this.palabra.value);
  }

  public limpiar(){
    this.palabra.reset();
    this.valorPalabra.emit(this.palabra.value);
  }

}
