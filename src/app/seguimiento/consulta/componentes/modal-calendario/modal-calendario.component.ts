import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FechaTransferencia } from 'src/app/shared/model/seguimiento/consultaUnidades';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { UnidadesService } from 'src/app/shared/services/seguimiento/unidades.service';

@Component({
  selector: 'app-modal-calendario',
  templateUrl: './modal-calendario.component.html',
  styleUrls: ['./modal-calendario.component.css']
})
export class ModalCalendarioComponent implements OnInit {
  public calendarOptions: CalendarOptions = {};
  //private fechaInicial: Date = new Date();
  //private fechaFinal: Date = new Date();
  private fechaSeleccionada: string = "";
  private cveClue: number = 0;
  public cambiarBoton: boolean = false;
  public date = new Date();
  public mes: string = "" ;
  private tipoUnidad: number = 0;

  private tipoNivel: string = '';

  @ViewChild('fullcalendar') private fullcalendar: FullCalendarComponent;

  private suscServiceConsulta: Subscription;
  
  constructor(
    private consultaUnidadesService: ConsultaUnidadesService,
    private modalDialogService: ModalDialogService,
    private alertService:AlertService,
    private dialog: MatDialog,
    private servUnidades: UnidadesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

   this.obtenerNumeroMes(this.date.getMonth()+1);

    this.calendarOptions = {
      initialDate: new Date(),
      views: {
        dayGridMonth: { 
          titleFormat: { year:'numeric'}
        },
      },
      //titleFormat:'\'Hola\'',
     /*dateClick: function(info) {
        //alert('Clicked on: ' + info.dateStr);
        console.log(info.dateStr);
        //this.obtenerFecha(this);
        this.obtenerFecha(info);
        info.dayEl.style.backgroundColor = 'red';
      },*/
      unselectAuto: false, //evita deseleccionar dia cuando le das clic en otra area del calendario
      selectable: true,//visualizar resaltado del color al seleccionar un dia
      select: this.obtenerFecha.bind(this), //ejecutar funcion a dar clic en un dia
      
      customButtons:{
        iconoAnterior: {
          text: 'Mes anterior',
          icon: 'fc-icon-chevron-left',
          click: () => {
            this.fullcalendar.getApi().prev();
            let numeroMes: number = this.fullcalendar.getApi().getDate().getMonth();
            let year: number = this.fullcalendar.getApi().getDate().getFullYear();
            this.obtenerNumeroMes(numeroMes+1);
            this.refresCustomButtons();
           
          },
        },
        iconoSiguiente: {
          text: 'Mes siguiente',
          icon: 'fc-icon-chevron-right',
          click: () => {
            this.fullcalendar.getApi().next();
            let numeroMes: number = this.fullcalendar.getApi().getDate().getMonth();
            this.obtenerNumeroMes(numeroMes+1);
            this.refresCustomButtons();
          },
        },
        actual: {
          text: this.mes,
          click: () => {
           //this.fullcalendar.getApi().today();
           return
          },
        },
        year:{
          text: this.date.getFullYear().toString(),
        },
        mes:{
          text: this.mes
        }
      } 
      ,
      headerToolbar: {
        left: 'mes,title',
        center:'',
        right: 'iconoAnterior,actual,iconoSiguiente',
      },
      
      dayHeaderContent: (day) => {
        return [
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
          'Domingo',
        ][day.date.getDay()];
      },
      /*validRange: {
        start: this.fechaInicial,
        end: this.fechaFinal,
      },*/
      locale: esLocale,
      
      initialView: 'dayGridMonth',
      //navLinks: true
    };
    this.cveClue = this.data.cveClue;
    this.tipoNivel = this.data.tipoNivel || '';
  }
  
  obtenerFecha(fecha: any){
   
    let fechaActual = new Date();
    let fechaElegida = new Date(fecha.startStr+'T00:00:00');//se resetea las horas para evitar que se reste un dia
    const calendarApi = fecha.view.calendar;

    if(fechaElegida.getTime() > fechaActual.getTime() ){
      this.modalDialogService.showDialog('Atención', "Advertencia", 'No se puede elegir una fecha superior a la actual', () => { });
      this.fechaSeleccionada = '';
      calendarApi.unselect();//deseleciona el dia
      return
    }
    this.fechaSeleccionada = fecha.startStr;
    
  }

  private refresCustomButtons(): void{
    this.calendarOptions.customButtons = {
      iconoAnterior: {
        text: 'Mes anterior',
        icon: 'fc-icon-chevron-left',
        click: () => {
          this.fullcalendar.getApi().prev();
          let numeroMes: number = this.fullcalendar.getApi().getDate().getMonth();
          this.obtenerNumeroMes(numeroMes+1);
          this.refresCustomButtons();
         
        },
      },
      iconoSiguiente: {
        text: 'Mes siguiente',
        icon: 'fc-icon-chevron-right',
        click: () => {
          this.fullcalendar.getApi().next();
          let numeroMes: number = this.fullcalendar.getApi().getDate().getMonth();
          this.obtenerNumeroMes(numeroMes+1);
          this.refresCustomButtons();
        },
      },
      actual: {
        text: this.mes,
        click: () => {
         //this.fullcalendar.getApi().today();
         return
        },
      },
      year:{
        text: this.date.getFullYear().toString(),
      },
      mes:{
        text: this.mes
      }
    };
  }

  private obtenerNumeroMes(numeroMes: number){
    this.mes = this.obtenerNombreMes(numeroMes);
  }

  private obtenerNombreMes(numMes:number): string{
    let mes: string = "";
    switch(numMes){
      case 1:
        mes = "Enero"
      break;
      case 2:
        mes = "Febrero"
      break;
      case 3:
        mes = "Marzo"
      break;
      case 4:
        mes = "Abril"
      break;
      case 5:
        mes = "Mayo"
      break;
      case 6:
        mes = "Junio"
      break;
      case 7:
        mes = "Julio"
      break;
      case 8:
        mes = "Agosto"
      break;
      case 9:
        mes = "Septiembre"
      break;
      case 10:
        mes = "Octubre"
      break;
      case 11:
        mes = "Noviembre"
      break;
      case 12:
        mes = "Diciembre"
      break;
    }
    return mes;
  }
  
  public save(){
    if(this.fechaSeleccionada === ""){
      this.modalDialogService.showDialog('Atención', "Advertencia", 'Debe elegir una fecha', () => { });
    } else if(this.tipoNivel==''){

      if((this.cveClue === 0 || this.cveClue === undefined || this.cveClue === null) && this.fechaSeleccionada === null){
        return
      }

      this.cambiarBoton = true;
      let data: FechaTransferencia = {
        cveClue: this.cveClue,
        fechaTransferencia: this.fechaSeleccionada
      }

      this.suscServiceConsulta = this.consultaUnidadesService.saveFechaTransferencia(data)
      .subscribe(resp=>{
       // console.log("RESPUESTA SAVE",resp);
        this.cambiarBoton = false;
        this.alertService.showAlertSuccess("La información ha sido guardada exitosamente.")
        this.dialog.closeAll();
        this.consultaUnidadesService.setRefrescar(true);
      }, (err: any) => {
        this.cambiarBoton = false;
        this.modalDialogService.showDialog('Atención', "Érror", 'Ocurrio un error al registrar la fecha', () => { });
      })
    } else {
      this.servUnidades.setSubjectFecha(this.fechaSeleccionada);
    }
  }

  ngOnDestroy(){
    this.consultaUnidadesService.setRefrescar(false);
    if(this.suscServiceConsulta){
      this.suscServiceConsulta.unsubscribe();
    }
  }

  /*AGREGAR EVENTO A UN DIA DEL CALENDARIO
  handleDateSelect(selectInfo: DateSelectArg) {
    console.log("SELECT",selectInfo);
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;


    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: '',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
  
  */


}
