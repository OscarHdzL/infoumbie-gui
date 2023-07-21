import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { MesaEntregaModel, vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { AvanceGeneralService } from 'src/app/shared/services/seguimiento/avance-general.service';
import { WebsocketService } from 'src/app/shared/services/seguimiento/websocket.service';
import { SemanasService } from 'src/app/shared/services/MesaEntrega/semanas.service';
import { SemanaModel } from 'src/app/shared/model/MesaEntrega/SemanaModel';

@Component({
  selector: 'app-avance-general-entrega-recepcion',
  templateUrl: './avance-general-entrega-recepcion.component.html',
  styleUrls: ['./avance-general-entrega-recepcion.component.css']
})
export class AvanceGeneralEntregaRecepcionComponent implements OnInit {

  actividades: any[]=[]
  actividadGeneral: any[]=[]
  general: any[]=[]
  estados: any[]=[]
  generalEstado: string = ''
  mesaServiceSubscription$: Subscription;
  public listaSemanas = new Array<SemanaModel>();
  periodo = new SemanaModel();
  public listMesaEntrega: vwMesaEntregaModel[] = [];

  constructor(private mesaEntregaService: MesaEntregaService,
    private modalDialogService: ModalDialogService,
    private router: Router, private websocketService: WebsocketService,
    private semanasService: SemanasService,
  ) { 

    

  }

  ngOnInit(): void {
    //this.websocketService.connect();
    this.obtenerDatos();
    this.cargarPeriodos()
  }


  obtenerDatos() {
    this.mesaEntregaService.getVwMesaEntrega().subscribe((response: any) => {
     
      if (response === undefined || response === null || response.lenght === 0) {
        //console.log('me meto en esto 🧨');
      } else {
        this.listMesaEntrega = response;
       var list = this.listMesaEntrega.sort((a,b) => {
        return a.id - b.id
      });
        console.log(this.listMesaEntrega)
        console.log('list', list)
      }
    }, (err: any) => {
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error', () => { });
    })
  }

  ir(index){
    console.log('🎈',index);
    const estado = this.estados[index].estado
    sessionStorage.setItem('estadoStr', estado);
    console.log('🎈',estado);
    this.router.navigate([NAVEGACION.seguimiento],{
      queryParams: {
        estado
      }
    })   
  }

  irMesaEntregaRecepcion(mesa: vwMesaEntregaModel){

    this.mesaEntregaService.setMesaEntregaActual(mesa);
    this.router.navigate(['/mesa-entrega-recepcion', mesa.id]);

  }

  cargarPeriodos() {
    
    this.semanasService
      .getSemanas()
      .subscribe(
        (data) => {
          if (data && data.length > 0) {
            
            this.listaSemanas = data;
            this.listaSemanas.forEach((x)=>{
              x.periodoInicio = this.convertirFecha(x.inicio);
              x.periodoFin = this.convertirFecha(x.fin)
            });
            
            var hoyArreglo = new Date().toLocaleDateString('es-MX').split('/');
            let hoy = new Date(Number(hoyArreglo[2]), Number(hoyArreglo[1]) - 1, Number(hoyArreglo[0]));

            this.periodo = this.listaSemanas.filter((x)=> new Date(x.inicio) <= hoy && new Date(x.fin) >= hoy)[0];
            this.semanasService.setSemana(this.periodo);
          } else {
            this.semanasService.setSemana(null);
          }
        },
        (error: any) => {
          console.log("Error al cargar peridos:", error);
        }
      );
  }

  
  convertirFecha(fecha: string){ 

    let arreglo = fecha.split('-');
    let fechaConvertida = '';
    switch(arreglo[1]){
      case '01':
          fechaConvertida = arreglo[2] + ' Enero ' + arreglo[0];
        break;
      case '02':
          fechaConvertida = arreglo[2] + ' Febrero ' + arreglo[0];
        break;
        case '03':
          fechaConvertida = arreglo[2] + ' Marzo ' + arreglo[0];
        break;
        case '04':
          fechaConvertida = arreglo[2] + ' Abril ' + arreglo[0];
        break;
        case '05':
          fechaConvertida = arreglo[2] + ' Mayo ' + arreglo[0];
        break;
        case '06':
          fechaConvertida = arreglo[2] + ' Junio ' + arreglo[0];
        break;
        case '07':
          fechaConvertida = arreglo[2] + ' Julio ' + arreglo[0];
        break;
        case '08':
          fechaConvertida = arreglo[2] + ' Agosto ' + arreglo[0];
        break;
        case '09':
          fechaConvertida = arreglo[2] + ' Septiembre ' + arreglo[0];
        break;
        case '10':
          fechaConvertida = arreglo[2] + ' Octubre ' + arreglo[0];
        break;
        case '11':
          fechaConvertida = arreglo[2] + ' Noviembre ' + arreglo[0];
        break;
        case '12':
          fechaConvertida = arreglo[2] + ' Diciembre ' + arreglo[0];
        break;
    }

    return fechaConvertida;
  }

  

}
