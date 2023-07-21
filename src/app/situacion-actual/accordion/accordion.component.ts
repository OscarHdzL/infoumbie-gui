import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  @Input()
  public open = false;

  @Input()
  public title = '';

  constructor() { }

  ngOnInit(): void {
  }

  public show() {
    console.log('ClickEvent');
    this.open = !this.open;
    console.log('Open', this.open);
  }

}
