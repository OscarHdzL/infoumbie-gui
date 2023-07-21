import {Component, Input, OnInit} from '@angular/core';
import {Archivo, ArchivoResponse} from "../../../shared/model/seguimiento/Archivo";
import {AlertService} from "../../../shared/services/alert/alert.service";
import {b64toBlob} from "../../../shared/utils/file-utils";
import * as FileSaver from 'file-saver';
import { MatDialog } from "@angular/material/dialog";
import { GaleriaSeguimientoComponent } from '../../galeria-seguimiento/galeria-seguimiento.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public files: Archivo[] = [];

  constructor(
    private alertService: AlertService,  
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
    ) { }

  @Input()
  public idInput: string = 'idArchivo';

  @Input()
  public header: string = '';

  @Input()
  public requerido: boolean = false;

  @Input()
  public footer: string = '';

  @Input()
  public maxFiles: number = 1;

  @Input()
  public sizeFiles: number = 0;

  @Input()
  public sizeFile: number = 0;

  @Input()
  public formatos: string = "images/*";

  public _loading = false;

  private uno: string = ''


  ngOnInit(): void {
    
  }

  selectedFile() {
    let input = document.getElementById(this.idInput);
    if (input)
      input.click();
  }

  handleFileInput(event: any) {
    if (event.target.files) {
      let fileToUpload: File = event.target.files.item(0);
       console.log('Tipo de archivo',fileToUpload.type);

       if (this.formatos.includes(fileToUpload.type)) {

         let file: Archivo = new Archivo();
         file.file = event.target.files[0];
         file.nomFile = event.target.files.item(0).name;
         file.base64 = event.target.files.item(0);
         file.srcImagen = this.createImageFromBlob(event.target.files.item(0));

         let sizeFileUploaded = fileToUpload.size;

         if ( this.sizeFile !== 0 && sizeFileUploaded > this.sizeFile ) {
           this.alertService.showAlertError('El tamaño del archivo excede el limite configurado');
           return;
         }

         if ( this.sizeFiles !== 0 ) {
           this.files.forEach(f => {
             sizeFileUploaded = sizeFileUploaded + f.file.size;
           });

           if ( sizeFileUploaded > this.sizeFiles ) {
             this.alertService.showAlertError('El tamaño de los archivo excede el limite configurado');
             return;
           }
         }

         this.files.push(file);

       } else {
         this.alertService.showAlertError('El archivo es de un formato no aceptado');
         return;
       }

    }
  }

  verArchivo(index: number): void {
    let file = this.files[index];
    if (file.nomFile != "" && (file.nomFile.includes("mp4") || file.nomFile.includes("xlsx") || file.nomFile.includes("pdf"))) {
      FileSaver.saveAs(file.base64, `${file.nomFile}`);
    } else if (file.nomFile != "")  {
      //var fileURL = URL.createObjectURL(file.base64);
      //window.open(fileURL);
      this.showGaleria(file.nomFile);
    }
  }

  descargarImagen(index: number): void {
    let file = this.files[index];
    FileSaver.saveAs(file.base64, `${file.nomFile}`);
  }

  showGaleria(nomImgSeleccionada: string) {
    let datos = {
      imagenes: this.getImages(),
      nomImgSeleccionada: nomImgSeleccionada
    };
    
      this.dialog.open(GaleriaSeguimientoComponent,{
        data: datos,
        width:'100%',
      });
    
   
  }

  public eliminarArchivo(index: number) {
    this.files.splice(index, 1);
  }

  public getFiles(): File[] {
    let filesReturn: File[] = [];
    if (this.files.length > 0) {
      filesReturn = this.files.map(f => f.file);
    }
    return filesReturn;
  }

  public setFiles(archivos: ArchivoResponse[]) {
    this.files = [];
      if (archivos && archivos.length > 0) {
        console.log('Archivos que llegan al componente', archivos);
        archivos.forEach(af => {
          const archivoAux: Archivo = new Archivo();
          archivoAux.nomFile = af.nombreArchivo;
          archivoAux.base64 = b64toBlob(af.archivoBase64, af.mediaType);
          archivoAux.file = new File([archivoAux.base64], archivoAux.nomFile, {type: af.mediaType});
          archivoAux.srcImagen = this.createImageFromBlob(archivoAux.base64);
          this.files.push(archivoAux);
         // console.log('Archivos ENVIADOS', this.files);
        });
        console.log(archivos);
    }
      this.desbloquea();
  }

  getImages(): Archivo[] {
    return this.files.filter(archivo => archivo.nomFile.includes('png') || archivo.nomFile.includes('jpg') || archivo.nomFile.includes('jpeg'));
  }

  public bloquea(uno: string) {
    this.uno = uno;
    console.log('FileUploadComponent bloqueando',  uno);
    this.files = [];
    this._loading = true;
  }

  public desbloquea() {
    console.log('FileUploadComponent desbloqueando',  this.uno);
    this._loading = false;
  }

  private createImageFromBlob(blobImagen: Blob): any{

    if(blobImagen === null || blobImagen === undefined){
      return '';
    }

    let fileURL = URL.createObjectURL(blobImagen);

    return this.sanitizer.bypassSecurityTrustUrl(fileURL);
  }


}
