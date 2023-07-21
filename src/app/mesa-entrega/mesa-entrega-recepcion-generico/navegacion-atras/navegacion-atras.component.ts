import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Location } from '@angular/common';
import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
@Component({
  selector: 'app-navegacion-atras',
  templateUrl: './navegacion-atras.component.html',
  styleUrls: ['./navegacion-atras.component.scss']
})
export class NavegacionAtrasComponent implements OnInit {

  //@Input()
  titulo?: string = '';
  
  @Input()
  subtitulo?: string = '';

  @Input()
  irAtras?: string = NAVEGACION.seguimiento;
  
  fecha = '';
  cargandoFechas: boolean = true;
  busquedaSinResultados: boolean = false;
  mesaServiceSubscription$: Subscription;
  mesaActualModel: vwMesaEntregaModel = new vwMesaEntregaModel();
  constructor(
    private router: Router,
    private _location: Location,
    private mesaEntregaService: MesaEntregaService,
  ) {
    
    this.mesaServiceSubscription$ = this.mesaEntregaService.getMesaEntregaActual().subscribe(
      (data) => {
        console.log("MesaActual" , data);
        this.mesaActualModel = data;
        
        this.titulo = this.mesaActualModel.mesa;
      });
  }


  ngOnDestroy(): void {

    if (this.mesaServiceSubscription$) {
      this.mesaServiceSubscription$.unsubscribe();
    }

  }
  ngOnInit(): void {
    
    this.irAtras

     
    var hoyArreglo = new Date().toLocaleDateString('es-MX').split('/');
    let hoy = new Date(Number(hoyArreglo[2]), Number(hoyArreglo[1]) - 1, Number(hoyArreglo[0]));

    this.fecha = this.convertirFecha(hoy.getFullYear(),hoy.getMonth() + 1, hoy.getDate())
  }



  atras(): void {
    
    this.router.navigate([this.irAtras]);
  }


  convertirFecha(anio: number, mes: number, dia: number){ 

    let fechaConvertida = '';
    switch(mes){
      case 1:
          fechaConvertida = dia + ' Enero ' + anio;
        break;
      case 2:
          fechaConvertida = dia + ' Febrero ' + anio;
        break;
        case 3:
          fechaConvertida = dia + ' Marzo ' + anio;
        break;
        case 4:
          fechaConvertida = dia + ' Abril ' + anio;
        break;
        case 5:
          fechaConvertida = dia + ' Mayo ' + anio;
        break;
        case 6:
          fechaConvertida = dia + ' Junio ' + anio;
        break;
        case 7:
          fechaConvertida = dia + ' Julio ' + anio;
        break;
        case 8:
          fechaConvertida = dia + ' Agosto ' + anio;
        break;
        case 9:
          fechaConvertida = dia + ' Septiembre ' + anio;
        break;
        case 10:
          fechaConvertida = dia + ' Octubre ' + anio;
        break;
        case 11:
          fechaConvertida = dia + ' Noviembre ' + anio;
        break;
        case 12:
          fechaConvertida = dia + ' Diciembre ' + anio;
        break;
    }

    return fechaConvertida;
  }

}
