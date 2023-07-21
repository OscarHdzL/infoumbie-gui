import { Component, OnInit } from '@angular/core';
import { VERSION } from '../../constants/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public get version() : typeof VERSION {
    return VERSION;
  }

}
