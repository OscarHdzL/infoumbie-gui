import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { AvanceGeneralService } from 'src/app/shared/services/seguimiento/avance-general.service';
import {WebsocketService} from "../../shared/services/seguimiento/websocket.service";

@Component({
  selector: 'app-avance-general',
  templateUrl: './avance-general.component.html',
  styleUrls: ['./avance-general.component.css']
})
export class AvanceGeneralComponent implements OnInit {

  actividades: any[]=[]
  actividadGeneral: any[]=[]
  general: any[]=[]
  estados: any[]=[]
  generalEstado: string = ''

  public listActividades: any[] = [];

  constructor(private avanceGeneralService: AvanceGeneralService,
    private modalDialogService: ModalDialogService,
    private router: Router, private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.websocketService.connect();
    this.obtenerDatos();
  }


  obtenerDatos() {
    this.avanceGeneralService.getAvanceGeneral().subscribe((response: any) => {
     
      if (response === undefined || response === null || response.lenght === 0) {
        //console.log('me meto en esto 🧨');
      } else {
        const { actividades, general } = response
        this.actividadGeneral = actividades;
     
        actividades.forEach(element => {
            let a = {
              indice: element.indice,
              tareas: element.tarea
            }
          this.actividades.push(a);
          
        });
       
        general.items.forEach(e => {
          this.general.push(e.porcentajeCompletado)
          let actividadEstados = {
            estado: e.estado,
            fechaInicio: e.fechaInicio,
            fechaFin: e.fechaFin
          }
          this.estados.push(actividadEstados)
        });   
        this.generalEstado = general.estado;
        // console.log('⛳', this.actividades);
        // console.log('⛳', this.general);
        // console.log('⛳', this.generalEstado);
        console.log('⛳', this.estados);
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

  
}
