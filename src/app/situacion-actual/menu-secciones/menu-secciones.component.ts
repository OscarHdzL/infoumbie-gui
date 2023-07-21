import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-secciones',
  templateUrl: './menu-secciones.component.html',
  styleUrls: ['./menu-secciones.component.css']
})
export class MenuSeccionesComponent implements OnInit {

  @Output() indexSelected = new EventEmitter<number>();

  public selected = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public select(index: number) {
    this.selected = index;
    console.log('Selected', this.selected);
    this.indexSelected.emit(this.selected);
  }

}
