import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoSemanal } from 'src/app/shared/model/seguimiento/periodo-semanal';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit { 

  @Input() estado: string = '';
  @Input() descNivel: string = '';
  @Input() loadingFecha: boolean = false;
  @Input() fechaPeriodo: PeriodoSemanal = new PeriodoSemanal();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public atras(){
    this.router.navigate(['seguimiento']);
  }

}
