import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TotalUnidades, Unidades, UnidadesFiltro } from 'src/app/shared/model/seguimiento/totalUnidades';
import { EstadoService } from 'src/app/shared/services/seguimiento/estado.service';
import { TotalUnidadesService } from 'src/app/shared/services/seguimiento/total-unidades.service';
import { tap } from 'rxjs/operators'
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormControl } from '@angular/forms';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total-unidades',
  templateUrl: './total-unidades.component.html',
  styleUrls: ['./total-unidades.component.css']
})
export class TotalUnidadesComponent implements OnInit {

  public listaUnidades: Unidades[] = [];
  public totalUnidades: number = 0;
  public totalTransferidas: number = 0;
  public loading: boolean = true;
  public estado: string = '';
  public descNivel: string = '';
  public cveEntidad: number = 0;
  public nivel = new FormControl();
  private suscServiceTotalUnidades: Subscription;
  private suscServiceRefrescarTabla: Subscription;
  private suscServiceCatalogoNiveles: Subscription;
  public catalogoNiveles: string[] = [];

  constructor(
    private router: Router,
    private totalUnidadesService: TotalUnidadesService,
    private rutaActiva: ActivatedRoute,
    private estadoService: EstadoService,
    private modalDialogService: ModalDialogService,
    private consultaUnidadesService: ConsultaUnidadesService,
    private spinner: NgxSpinnerService
    
  ) { }

  public atras(){
    this.router.navigate(['seguimiento']);
  }

  ngOnInit(): void {
    this.nivel.setValue('todos');
    this.spinner.show();
    this.suscServiceCatalogoNiveles = this.totalUnidadesService.getCatalogoNiveles()
    .subscribe(resp=>{
      this.catalogoNiveles = resp;
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error en el servicio de la consulta de niveles', () => { });
    }
    );

    this.rutaActiva.queryParams
    .pipe(
      tap(parametros => {
       // console.log("PARAMETROS",parametros);
        this.descNivel = parametros.descripcion;
        this.cveEntidad = parametros.cveEntidad;
        this.estado = parametros.nomEntidad;
      }))
    .subscribe(parametros =>{

      if(parametros.cveEntidad === 0 && parametros.descripcion === null){
        return
      }

      this.getDataUnidades(parametros.cveEntidad, parametros.descripcion);
    });

    this.suscServiceRefrescarTabla = this.consultaUnidadesService.getRefrescar$()
    .subscribe(resp=>{
      if(resp===false){
        return
      }

      this.getDataUnidades(this.cveEntidad, this.descNivel);
      
    });

    /*this.estadoService.getEstado$().subscribe((estadoFiltro) => {
      if (estadoFiltro) {
        this.estado = estadoFiltro.nomEntidad;
      }
    });*/
  }

  private getDataUnidades(cveEntidad: number, nivelAtencion: any): void{
   
    this.suscServiceTotalUnidades = this.totalUnidadesService.getTotalUnidades(cveEntidad, nivelAtencion).
    subscribe((resp: any) => {
      //console.log("DATE TOTAL UNIDADES", resp);
      this.totalTransferidas = resp.totalTransferidas;
      this.totalUnidades = resp.totalUnidades;
      this.listaUnidades = resp.unidades;
      this.loading = false;
    },(err) =>{
      this.loading = false;
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error en el servicio de las unidades', () => { });
    }
    )
  }

  /*public unidadesFiltradas(dataUnidades: TotalUnidades){
    console.log("DATA ACRUALIZADA", dataUnidades);
    this.listaUnidades = dataUnidades.unidades;
    this.totalTransferidas = dataUnidades.totalTransferidas;
    this.totalUnidades = dataUnidades.totalUnidades;
  }*/

  //Refrescar tabla sin perder el nivel que tiene en el filtro
  public closeModal(dataUnidades: any){
    this.getDataUnidades(dataUnidades.cveEntidad, dataUnidades.descripcion);
  }

  
 public buscar(){
  //this.getDataUnidades(this.cveEntidad, this.nivel.value);
  this.spinner.show();
  this.totalUnidadesService.getTotalUnidades(this.cveEntidad, this.nivel.value).
    subscribe((resp: any) => {
      this.totalTransferidas = resp.totalTransferidas;
      this.totalUnidades = resp.totalUnidades;
      this.listaUnidades = resp.unidades;
      this.spinner.hide();
    },(err) =>{
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error en el servcio de buscar', () => { });
    }
    );
  }

  ngOnDestroy(){
    this.consultaUnidadesService.setRefrescar(null);

    if(this.suscServiceRefrescarTabla){
      this.suscServiceRefrescarTabla.unsubscribe();
    }

    if(this.suscServiceCatalogoNiveles){
      this.suscServiceCatalogoNiveles.unsubscribe();
    }
    
    if(this.suscServiceTotalUnidades){
      this.suscServiceTotalUnidades.unsubscribe();
    }
  }

}
