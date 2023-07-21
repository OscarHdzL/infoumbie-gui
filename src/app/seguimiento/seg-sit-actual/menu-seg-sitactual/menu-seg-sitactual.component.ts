import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-seg-sitactual',
  templateUrl: './menu-seg-sitactual.component.html',
  styleUrls: ['./menu-seg-sitactual.component.css']
})
export class MenuSegSitactualComponent implements OnInit {

  @Output() indexSelected = new EventEmitter<number>();

  public selected = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  public select(index: number) {
    this.selected = index;
    console.log('Selected', this.selected);
    this.indexSelected.emit(this.selected);
  }
}
