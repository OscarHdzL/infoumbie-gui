import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-card',
  templateUrl: './panel-card.component.html',
  styleUrls: ['./panel-card.component.css']
})
export class PanelCardComponent implements OnInit {

  @Input()
  titulo: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
