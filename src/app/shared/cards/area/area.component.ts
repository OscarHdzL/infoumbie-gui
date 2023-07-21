import { Component, Input, OnInit } from '@angular/core';
import { Area } from '../../model/area/area';
import { AreaService } from '../../services/area/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  @Input() area: Area;
  constructor(private areaService : AreaService) { }

  ngOnInit(): void {
    sessionStorage.setItem("seccion","Areas");
  }

  public navigateAreaCards(area : Area){
    this.areaService.navigateAreaCards(area);
  }

}
