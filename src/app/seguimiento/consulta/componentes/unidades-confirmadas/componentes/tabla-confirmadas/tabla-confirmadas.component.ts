import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { UbicacionClue, Unidades } from 'src/app/shared/model/seguimiento/consultaUnidades';
import { SeguiSitActualService } from 'src/app/shared/services/seguimiento/segui-sit-actual.service';
import { ModalCalendarioComponent } from 'src/app/seguimiento/consulta/componentes/modal-calendario/modal-calendario.component';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-confirmadas',
  templateUrl: './tabla-confirmadas.component.html',
  styleUrls: ['./tabla-confirmadas.component.css']
})
export class TablaConfirmadasComponent implements OnChanges, OnDestroy {

  @Input() public datos: Unidades[] = [];
  @Input() public loading: boolean;
  @Input() public idEstado: boolean;
  @Input() public nomEntidad: string;
  @Input() public descNivel: string;
  @Input() public tipoUnidad: string;
  public permisoPermitido: Boolean = false;

  private suscSerConsulta: Subscription;

  public displayedColumns: string[] = 
  [
    'rowNum',
    'nomClue', 
    'nomMunicipio',
    'ubicacion',
    'fechaTransferencia', 
    'comentarios',
    'galeria'
  ];

  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private seguiSitActualService:SeguiSitActualService,
    private consultaService: ConsultaUnidadesService,
    private spinner: NgxSpinnerService,
    private alertService:AlertService,

  ) { }

  
  ngOnChanges(changes: SimpleChanges): void{
   // this.loading = true;
    //console.log("LOADING",this.loading);
    //console.log("DATA CONSULTA",changes);
    
    if(changes.datos && changes.datos.currentValue && changes.datos.currentValue.length > 0){
      this.dataSource = new MatTableDataSource<Unidades>(changes.datos.currentValue);
      this.dataSource.paginator = this.paginator;    
    }else {
      this.dataSource = new MatTableDataSource<Unidades>([]);
      this.dataSource.paginator = this.paginator;  
    }
  }

  public mostrarModal(cveClue: number){
    let datos = {
      cveClue: cveClue,
      tipoUnidad: this.tipoUnidad
    };
    
    this.dialog.open(ModalCalendarioComponent,{
      width:'700px',
      autoFocus: false,
      data: datos,
      disableClose: true
    });
  }

  irComentarios(cveClue: number, nomClue: string, ruta: string){

    this.router.navigate([NAVEGACION.comentarios], {
      queryParams: {
        cveClue: cveClue,
        nomClue: nomClue,
        cveEntidad: this.idEstado,
        nomEntidad: this.nomEntidad,
        descNivel: this.descNivel,
        ruta: ruta
      }
    })
  }

  public mostrarUbicacion(cveClue: number): void{
    if(cveClue === 0 || cveClue === null || cveClue === undefined ){
      this.alertService.showAlertError('No se reconoció la Clave de la Clue');
      return;
    }

    this.ubicacionClue(cveClue);
  }

  irSituacionActual(unidad: Unidades) {
    this.seguiSitActualService.setUnidad$(unidad);
    this.router.navigate([NAVEGACION.seguimientoSitActual]);
  }

  public permiso(valor: Boolean): void{
    //console.log("PERMISOS PERMISOS", valor);
    this.permisoPermitido = valor;
  }

  private ubicacionClue(cveClue: number){
    this.spinner.show();
    this.suscSerConsulta = this.consultaService.getUbicacionClue(cveClue)
    .subscribe((resp: UbicacionClue) => {
        this.spinner.hide();
        window.open(resp.urlLocalizacion, '_blank');
    });
  }

  ngOnDestroy(): void{
    if(this.suscSerConsulta){
      this.suscSerConsulta.unsubscribe();
    }
  }
}
