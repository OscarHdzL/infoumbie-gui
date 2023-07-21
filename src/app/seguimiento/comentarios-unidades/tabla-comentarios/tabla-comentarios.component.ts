import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Comentarios } from 'src/app/shared/model/seguimiento/comentarios';
import {ArchivosService} from "../../../shared/services/seguimiento/archivos.service";
import {AlertService} from "../../../shared/services/alert/alert.service";
import {Archivo, ArchivoResponse} from "../../../shared/model/seguimiento/Archivo";
import {b64toBlob} from "../../../shared/utils/file-utils";
import { MatDialog } from '@angular/material/dialog';
import { GaleriaSeguimientoComponent } from '../../galeria-seguimiento/galeria-seguimiento.component';
import {NgxSpinnerService} from "ngx-spinner";
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-tabla-comentarios',
  templateUrl: './tabla-comentarios.component.html',
  styleUrls: ['./tabla-comentarios.component.css']
})
export class TablaComentariosComponent implements OnInit, OnChanges {

  @Input() datosTabla: Comentarios[] = [];
  @Input() loading: boolean
  @Input() cveEntidad: string
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['id', 'fecAlta', 'desComentario', 'nomUsuario', 'galeria'];
  dataSource = new MatTableDataSource<Comentarios>();

  constructor(
    private archivosService: ArchivosService,
    private alertService:AlertService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
    ) { }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    //console.log('⛳',this.dataSource.sort);
  }

  ngOnInit(): void {
    this.dataSource.data = this.datosTabla; 
  }

  visor(index){
    //console.log('index ⏳🎳🎳🥌', index);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datosTabla.currentValue) {
      this.datosTabla.forEach(e => {
        e.nomUsuario = this.doCapital(e.nomUsuario.trim());
      });
      console.log(this.datosTabla)
			 this.datosTabla = this.datosTabla.sort((a, b) => {
        const d1 = new Date(a.fecAlta).getTime();
        const d2 = new Date(b.fecAlta).getTime();
			 	return d1 < d2 ? -1 : 1;				
			 });
       console.log(this.datosTabla);
       this.dataSource = new MatTableDataSource<Comentarios>(this.datosTabla);
        this.dataSource.sort = this.sort;
      //this.dataSource.data = this.datosTabla;
      this.loading = false;
    }
  }

  verGaleria(cveClueComentario: number) {
    this.spinner.show();
    const archivosGaleria: Archivo[] = [];
    this.archivosService.obtenerArchivosComentarios(cveClueComentario, this.cveEntidad).subscribe(archivos => {
      if (archivos && archivos.length>0) {
          console.log('Archivos que llegan al componente', archivos);
          archivos.forEach(af => {
            const archivoAux: Archivo = new Archivo();
            archivoAux.nomFile = af.nombreArchivo;

            if (af.mediaType === 'image/png' || af.mediaType === 'image/jpeg') {
                archivoAux.base64 = b64toBlob(af.archivoBase64, af.mediaType);
                archivoAux.file = new File([archivoAux.base64], archivoAux.nomFile, {type: af.mediaType});
                archivosGaleria.push(archivoAux);
            }
          });

          if (archivosGaleria && archivosGaleria.length > 0) {
              let datos = {
                  imagenes: archivosGaleria,
              };

              this.dialog.open(GaleriaSeguimientoComponent,{
                  width:'100%',
                  data: datos
              });
          }
          this.spinner.hide();
          //console.log(archivosGaleria);
      } else {
        this.alertService.showAlertSuccess('No existen archivos para visualizar en galería');
        this.spinner.hide();
      }

    }, error => {
      this.spinner.hide();
          this.alertService.showAlertError('Error al consultar los archivos del comentario')
      }
    );
  }


  descargarArchivos(cveClueComentario: number) {
    this.archivosService.obtenerArchivosComentarios(cveClueComentario, this.cveEntidad).subscribe(archivos => {
          if (archivos && archivos.length>0) {
            console.log('Archivos que llegan al componente', archivos);
            this.download(archivos);
          } else {
            this.alertService.showAlertSuccess('No existen archivos para descargar');
          }

        }, error => {
          this.alertService.showAlertError('Error al consultar los archivos del comentario')
        }
    );
  }

    download = async (archivos: ArchivoResponse[]) => {
      for(let af of archivos) {
          const archivoAux: Archivo = new Archivo();
          archivoAux.nomFile = af.nombreArchivo;
          archivoAux.base64 = b64toBlob(af.archivoBase64, af.mediaType);
          archivoAux.file = new File([archivoAux.base64], archivoAux.nomFile, {type: af.mediaType});
          console.log('Descargando archivo', archivoAux);
          FileSaver.saveAs(archivoAux.base64, `${archivoAux.nomFile}`);
          await new Promise(r => setTimeout(r, 2000));
      }
    }

  public doCapital(str){
    var retorno='';
    var palabras = str.split(' ');
    palabras.forEach((e,i) => {
         if(palabras.length>1){
             if(i===palabras.length-1){
               retorno+=e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
             }else{
               retorno+=e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() + '%20';
             }
         }else{
           retorno+=e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
         }
    }); 
    return retorno;
}

}

