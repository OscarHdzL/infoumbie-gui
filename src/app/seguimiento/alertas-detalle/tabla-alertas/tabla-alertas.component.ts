import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evidencias, ResponseDetalleAlertas } from 'src/app/shared/model/seguimiento/alertas';
import { Archivo, ArchivoResponse } from 'src/app/shared/model/seguimiento/Archivo';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertasService } from 'src/app/shared/services/seguimiento/alertas.service';
import { b64toBlob } from 'src/app/shared/utils/file-utils';
import * as FileSaver from 'file-saver';
import { GaleriaSeguimientoComponent } from '../../galeria-seguimiento/galeria-seguimiento.component';
import { Subscription } from 'rxjs';
import { Entidad } from 'src/app/shared/model/situacion-actual/Entidad';


@Component({
  selector: 'app-tabla-alertas',
  templateUrl: './tabla-alertas.component.html',
  styleUrls: ['./tabla-alertas.component.css']
})
export class TablaAlertasComponent implements OnInit, OnChanges {

  public displayedColumns: string[] = 
  [
    'fecAlta',
    'detalle', 
    'autor',
    'evidencia',
    'estatus'
  ];

  @Input() public datos: ResponseDetalleAlertas[] = [];
  @Input() public loading: boolean;
  @Input() public entidad:  Entidad = new Entidad();
  public dataSource = new MatTableDataSource<ResponseDetalleAlertas>();
  @ViewChild(MatSort) sort: MatSort;

  public mostrarCompleto = false;
  private susVerEvidencias: Subscription;
  private susDownloadEvidencias: Subscription;

  constructor(
    private alertaService: AlertasService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void{
     if(changes.datos && changes.datos.currentValue && changes.datos.currentValue.length > 0){

       this.dataSource = new MatTableDataSource<ResponseDetalleAlertas>(changes.datos.currentValue);  
       this.dataSource.sort = this.sort;

     }else {
       this.dataSource = new MatTableDataSource<ResponseDetalleAlertas>([]);
       
     }
   }

   
   public verEvidencias(cveAlerta: number): void{
    this.spinner.show();
    let arregloImgs: any [] = [];
  
    this.susVerEvidencias = this.alertaService.getEvidencias(this.entidad.cveEntidad, cveAlerta)
    .subscribe((archivos: Evidencias[]) => {
      this.spinner.hide();
      //console.log('Archivos que llegan al componente', archivos);
    
      if (archivos && archivos.length > 0 ) {

        archivos.forEach((af) => {
          const archivoAux: Archivo = new Archivo();
          
          archivoAux.nomFile = af.nombreArchivo;

          if (af.mediaType === 'image/png' || af.mediaType === 'image/jpeg' || af.mediaType === 'image/jpg') {
            archivoAux.base64 = b64toBlob(af.archivoBase64, af.mediaType);
            archivoAux.file = new File([archivoAux.base64], archivoAux.nomFile, {type: af.mediaType});
           
            arregloImgs.push(archivoAux);
          }
        });

        this.mostrarImagenes(arregloImgs);
        
    } else {
      this.alertService.showAlertSuccess('No existen archivos para visualizar en galería');
      this.spinner.hide();
    }
    },error => {
      this.alertService.showAlertError('Error al consultar las Evidencias de la Alerta');
      this.spinner.hide();
    }
    );
   }

   public mostrarImagenes(arrImagenes: any[]): void{
    //console.log("IMAGENES", arrImagenes);
    if(arrImagenes &&  arrImagenes.length > 0) {
      
      let data = {
        imagenes: arrImagenes
      };

       this.dialog.open(GaleriaSeguimientoComponent,{
         width:'100%',
         data: data
       });
    }
 }
 

   public descargarArchivos(cveAlerta: number) {
    this.susDownloadEvidencias = this.alertaService.getEvidencias(this.entidad.cveEntidad, cveAlerta).subscribe(archivos => {
      //console.log("ARCHIVOS ALERTAS A DESCARGAR", archivos);
          if (archivos && archivos.length>0) {
            //console.log('Archivos que llegan al componente', archivos);
            this.download(archivos);
          } else {
            this.alertService.showAlertSuccess('No existen archivos para descargar');
          }

        }, error => {
          this.alertService.showAlertError('Error al descargar las evidencias de la alerta')
        }
    );
  }

  public download = async (archivos: ArchivoResponse[]) => {
    for(let af of archivos) {
        const archivoAux: Archivo = new Archivo();
        archivoAux.nomFile = af.nombreArchivo;
        archivoAux.base64 = b64toBlob(af.archivoBase64, af.mediaType);
        archivoAux.file = new File([archivoAux.base64], archivoAux.nomFile, {type: af.mediaType});
        //console.log('Descargando archivo', archivoAux);
        FileSaver.saveAs(archivoAux.base64, `${archivoAux.nomFile}`);
        await new Promise(r => setTimeout(r, 2000));
    }
  }

  


   public cambiarEstatus(cveAlerta: number): void {
    if(cveAlerta === 0){
      return;
    }
    this.spinnerService.show();
    this.alertaService.updateEstatusAlerta(cveAlerta)
    .subscribe(response => {
      //console.log("UPDATE ESTATIS", response);
      this.spinnerService.hide();
    },(err: any) => {
      this.spinnerService.hide();
      this.alertService.showAlertError('Ocurrio un error en el servicio de actualizar Estatus de Alerta');
    }
    )
   }

   ngOnDestroy(): void{
    if(this.susVerEvidencias){
      this.susVerEvidencias.unsubscribe();
    }

    if(this.susDownloadEvidencias){
      this.susDownloadEvidencias.unsubscribe();
    }
   }



}
