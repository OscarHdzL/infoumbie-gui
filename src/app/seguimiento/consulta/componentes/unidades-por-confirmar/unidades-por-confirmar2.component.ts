import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidades-por-confirmar-detalle2',
  templateUrl: './unidades-por-confirmar2.component.html',
  styleUrls: ['./unidades-por-confirmar2.component.css']
})
export class UnidadesPorConfirmar2Component implements OnInit {

  @Input() tipoUnidad: number;
  
  public arrayUnidades: any[] = [
    {
      rowNum:'1',
      nomClue:'CINCO DE MAYO (EL CIRUELO)',
      nomMunicipio: 'TEPIC',
      confirmar: true,
      fechaConfirmacion: '01/04/22'
    },
    {
      rowNum:'2',
      nomClue:'LA YERBABUENA',
      nomMunicipio: 'AMATLAN DE CAÑAS',
      confirmar: false,
      fechaConfirmacion: ''
    }
];
  public loading: boolean = false;
  public totalUnidades: number = 0;
  public totalTransferidas: number = 0;
  public idEstado: number = 0;
  public descNivel: string = '';
  public estado: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  public datosFiltros(palabra: string){
    console.log("VALOR DE PALABARA", palabra);
  }

}
