import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRequest, FormFiltros, Unidades } from 'src/app/shared/model/seguimiento/consultaUnidades';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { EstadoService } from 'src/app/shared/services/seguimiento/estado.service';
import { FiltroConfirmadasComponent } from './componentes/filtro-confirmadas/filtro-confirmadas.component';

@Component({
  selector: 'app-unidades-confirmadas',
  templateUrl: './unidades-confirmadas.component.html',
  styleUrls: ['./unidades-confirmadas.component.css']
})
export class UnidadesConfirmadasComponent implements OnInit {

  public arrayUnidades: Unidades[] = [];
  public loading: boolean = true;
  public totalUnidades: number = 0;
  public totalTransferidas: number = 0;
  public idEstado: number = 0;
  public descNivel: string = '';
  private requestDetUnidades: DataRequest = new DataRequest();
  public estado: string = "";
  @Input() tipoUnidad: number;
  
  // static en false, estamos diciendo que ViewChild estará disponible en un momento posterior, pero depende de una condición
  // por lo tanto, debemos buscar ViewChild cada vez que se ejecute ChangeDetection
  @ViewChild(FiltroConfirmadasComponent, {static : false}) private filtroForm : FiltroConfirmadasComponent;

  private suscServiceConsulta: Subscription;
  private suscServiceRefrescarTabla: Subscription;
  private suscServiceEstado: Subscription;
  private suscResetFormFiltro: Subscription;

  constructor(
    private consultaUnidadesService: ConsultaUnidadesService,
    private modalDialogService: ModalDialogService,
    private estadoService: EstadoService

  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('descNivel')){
      this.descNivel = localStorage.getItem('descNivel');
    }else{
      this.descNivel = '';
    }
 
   /* if(localStorage.getItem('parametros')){
      let parametros: Parametros = JSON.parse(localStorage.getItem('parametros'));
      this.descNivel = parametros.descripcion;
      this.idEstado = parseInt(parametros.cveEntidad);


      if(this.idEstado === 0 && parametros.descripcion ===null){
        return;
      }

      this.dataConsultaUnidades(this.idEstado, parametros.descripcion);
      this.obtenerFechasPeriodo(parametros.nomEntidad);
    }*/
   /*this.rutaActiva.queryParams
    .pipe(
      tap(parametros => {
       //console.log("PARAMETROS",parametros);
        this.loading = true;
        this.arrayUnidades = [];
        this.totalUnidades = 0;
        this.totalTransferidas = 0;
        this.descNivel = parametros.descripcion;
        this.idEstado = parametros.cveEntidad;
        //this.estado = parametros.nomEntidad;
      }))
    .subscribe(parametros =>{

      if(parametros.cveEntidad === 0 && parametros.descripcion === null){
        return
      }

      this.dataConsultaUnidades(parametros.cveEntidad, parametros.descripcion);
      this.obtenerFechasPeriodo(parametros.nomEntidad);
    })*/

    //Obtenemos parametros recibidos de tabla unidades
   /* this.parametrosConsultaService.getParametros$()
    .subscribe((parametros) => {
      console.log("PARAMTEROS", parametros);
      if(parametros){
        this.descNivel = parametros.descripcion;
        this.idEstado = parseInt(parametros.cveEntidad);
        this.dataConsultaUnidades(this.idEstado, parametros.descripcion);
        this.obtenerFechasPeriodo(parametros.nomEntidad);
      }
    });*/

     //reset Formulario de filtros 
     this.suscResetFormFiltro = this.consultaUnidadesService.resetFormFiltros$()
     .subscribe((bandera) => {
       if(bandera){
         this.filtroForm.limpiarForm();
       }
     });

    //Suscripcion al observable de estados para obtener su valor cuando cambia
    this.suscServiceEstado = this.estadoService.getEstado$().subscribe((estadoFiltro) => {
      if (estadoFiltro) {
        this.loading = true;
        //console.log("ESTADO CONSULTA", estadoFiltro);
        this.estado = estadoFiltro.nomEntidad;
        this.idEstado = parseInt(estadoFiltro.cveEntidad);
        //this.arrayUnidades = [];

        this.requestDetUnidades = {
          cveEntidad: estadoFiltro.cveEntidad,
          nomClasificacion: this.descNivel,
          palabra: null,
          fechaInicio: null,
          fechaFin: null
        };

  
        this.dataConsultaUnidades(this.requestDetUnidades);
      }
    });

    //Refrescar tabla al registrar fecha de transferencia
    this.suscServiceRefrescarTabla = this.consultaUnidadesService.getRefrescar$()
    .subscribe(resp=>{
      if(resp===false){
        return
      }
      //this.loading = true;
      //this.arrayUnidades = [];
      this.dataConsultaUnidades(this.requestDetUnidades);
      
    });
  }

   private dataConsultaUnidades(dataRequest: DataRequest){

    //Reset de variables
    this.loading = true;
    this.arrayUnidades = [];
    this.totalUnidades = 0;
    this.totalTransferidas = 0;

    this.suscServiceConsulta = this.consultaUnidadesService.getDetalleUnidades(dataRequest)
    .subscribe((resp:any) => {
      //console.log("RESPUESTA", resp.unidades);
      this.arrayUnidades = resp.unidades;
      this.totalUnidades = resp.totalUnidades;
      this.totalTransferidas = resp.totalTransferidas;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error al obtener las clues de una unidad', () => { });
    }
    )
  }

  /*private updateLocalStorage(cveEntidad: string, nomEntidad: string, descripcion: string, ){
    let data: Parametros = {
      cveEntidad: cveEntidad,
      nomEntidad: nomEntidad,
      descripcion: descripcion
    }
    localStorage.setItem('parametros', JSON.stringify(data));
  }*/

  public datosFiltros(datos: FormFiltros){
    this.requestDetUnidades = {
      ...this.requestDetUnidades,
      palabra: datos.palabra,
      fechaInicio: datos.fechaUno,
      fechaFin: datos.fechaDos
    };
    //console.log("EVENT FILTRO", datos);
    this.dataConsultaUnidades(this.requestDetUnidades);

  }

  ngOnDestroy(){
    this.consultaUnidadesService.setRefrescar(null);
    //this.parametrosConsultaService.setParametros(null);

    if(this.suscServiceEstado ){
      this.suscServiceEstado.unsubscribe(); 
    }

    if(this.suscServiceRefrescarTabla){
      this.suscServiceRefrescarTabla.unsubscribe();
    }

    if(this.suscServiceConsulta){
      this.suscServiceConsulta.unsubscribe();
    }

    if(this.suscResetFormFiltro){
      this.suscResetFormFiltro.unsubscribe();
    }
  }

}
