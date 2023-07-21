import { Entidad } from './../../shared/model/situacion-actual/Entidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormFiltros, ParamDetAlertas, ResponseDetalleAlertas } from 'src/app/shared/model/seguimiento/alertas';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertasService } from 'src/app/shared/services/seguimiento/alertas.service';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { EstadoService } from 'src/app/shared/services/seguimiento/estado.service';
import { FiltrosAlertasComponent } from './filtros-alertas/filtros-alertas.component';

@Component({
  selector: 'app-alertas-detalle',
  templateUrl: './alertas-detalle.component.html',
  styleUrls: ['./alertas-detalle.component.css']
})
export class AlertasDetalleComponent implements OnInit {


  private susAlertaService: Subscription;
  private susEstadoService: Subscription;
  public suscResetFormFiltro: Subscription;
  private parametros: ParamDetAlertas = new ParamDetAlertas();

  public arrayAlertas: ResponseDetalleAlertas[] = [];
  public loading: boolean = true;
  public entidad: Entidad = new Entidad();

  @ViewChild(FiltrosAlertasComponent, {static : false}) private filtroForm : FiltrosAlertasComponent;

  constructor(
    private alertasService: AlertasService,
    private estadoService: EstadoService,
    private alertService: AlertService,
    private consultaUnidadesService: ConsultaUnidadesService
  ) { }

  ngOnInit(): void {
    this.susEstadoService = this.estadoService.getEstado$()
    .subscribe(estado =>{
      //console.log("RESP ESTADOS", estado);
      if(estado){
        if(estado.cveEntidad === null){
          return;
        }

        this.entidad = estado;
        this.parametros = {
          cveEntidad: estado.cveEntidad,
        };

        this.getDetalleAlertas(this.parametros);
      }
    });

    //reset Formulario de filtros 
    this.suscResetFormFiltro = this.consultaUnidadesService.resetFormFiltros$()
    .subscribe((bandera) => {
      if(bandera){
        this.filtroForm.limpiarForm();
      }
    });
  }

  public getDetalleAlertas(data: ParamDetAlertas): void{

    //reset variables
    this.loading = true;
    this.arrayAlertas = [];

    this.susAlertaService = this.alertasService.getAlertas(data)
    .subscribe((response: ResponseDetalleAlertas[]) => {
      //console.log("RESP SERVICIOS ALERTAS", response);
      this.arrayAlertas = response;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      this.alertService.showAlertError('Ocurrio un error en el servicio getDetalleAlertas');
    }
    )
  }

  public datosFiltros(datos: FormFiltros): void{
    
    this.parametros = {
      ...this.parametros,
      fechaInicio: datos.fechaInicio,
      fechaFin: datos.fechaFin,
      indEstatus: datos.estatus,
    };

    this.getDetalleAlertas(this.parametros);
  }

  nuevaAlerta(evnt: any): void {

    this.parametros = {
      cveEntidad: this.entidad.cveEntidad,
    };
    this.getDetalleAlertas(this.parametros);

  }

  ngOnDestroy(): void{
    if(this.susEstadoService){
      this.susEstadoService.unsubscribe();
    }
    if(this.susAlertaService){
      this.susAlertaService.unsubscribe();
    }

    if(this.suscResetFormFiltro){
      this.suscResetFormFiltro.unsubscribe();
    }
  }
}
