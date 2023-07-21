import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Archivo } from 'src/app/shared/model/archivo/archivo';
import { Area } from 'src/app/shared/model/area/area';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { ArchivosService } from 'src/app/shared/services/archivos/archivos.service';
import { AreaService } from 'src/app/shared/services/area/area.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { RubroService } from 'src/app/shared/services/rubro/rubro.service';
import {v4 as uuidv4} from 'uuid';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {

  public fileTypeIncorrect: boolean;
  public fileSizeIncorrect: boolean;
  public fileIsValid: boolean = false;
  public imagenes: Archivo[] = [];
  public area: any = null;
  public rubro: any = null;
  public indexImagenSeleccionada: number;
  idPerfil: number = 0;

  imagenFileData = "";
  pdfFileData = "";
  nombreFileData = "";

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer,
    private modalDialogService: ModalDialogService, private areaService: AreaService,
    private rubroService: RubroService, private router: Router,
    private archivosService: ArchivosService,private autenticacionService: AutenticacionService) { }
  public areas: Area[] = [];
  public rubros: Rubro[] = [];
  public docs: any[] = [];

  ngOnInit(): void {
//    this.getAreas();
    this.getFilesAll();
    this.getAreas();
    this.idPerfil = parseInt(this.autenticacionService.usuarioSesion.idPerfil);

  }

  getFilesAll() {
    this.spinner.show();
    this.archivosService.getAll(String(sessionStorage.getItem("idClues")),null,null,null).subscribe((response: any) => {
      this.spinner.hide();
      switch (response.status) {
        case 200:
          if (response.body!=null) {            
            this.imagenes = [];
            this.docs = response.body; 
            this.incomingfileDownload(this.docs);
            
          }
          break;
        case 204:
          this.imagenes = [];
          break;
      }

    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  getRubroAll() {
    if(this.rubro != "null"){
      this.spinner.show();
      this.archivosService.getRubroAll(this.area.idArea, this.rubro.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            if (response.body!=null) {
              this.imagenes = [];
              this.incomingfileDownload(response.body);
            }
            break;
          case 204:
            this.imagenes = [];
            break;
        }
  
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }
  }

  getAreas() {
    this.spinner.show();
    this.areaService.getArea().subscribe((response: any) => {
      this.spinner.hide();
      switch (response.status) {
        case 200:
          this.areas = response.body;
          this.areas.pop();
          break;
        case 204:
          this.rubros = [];
          this.rubro = null;
          this.imagenes = [];
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  public getRubrosPorArea() {

    if(this.area != "null"){
      this.spinner.show();
      this.rubros = [];
      this.rubro = null;
      this.imagenes = [];
      this.rubroService.getRubrosPorArea(this.area.idArea).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.rubros = response.body;
            break;
          case 204:
            this.rubros = [];
            this.rubro = null;
            this.imagenes = [];
            break;
        }
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }else{
      this.rubros = [];
    }
  }

  public sanitize(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  private limpiarMensajes() {
    this.fileTypeIncorrect = false;
    this.fileSizeIncorrect = false;
    this.fileIsValid = false;
  }


  private b64toBlob(b64Data: any, contentType: any) {
    let sliceSize = null;
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  public upload() {
    this.spinner.show();
    let archivos = new FormData();

    let imagenesTMP = [];
    console.log("Archivos antes de filtro: ", this.imagenes);
    this.imagenes.forEach(imagen => {
      let imagenB: any = null;
      if (imagen.archivo) {
        let block = imagen.archivo.split(";");
        let contentType = block[0].split(":")[1];
        if (contentType != undefined) {
          let realData = block[1].split(",")[1];
          imagenB = this.b64toBlob(realData, contentType);
          if(!imagen.download){
            archivos.append('files', imagenB, imagen.fileName);
            imagenesTMP.push(imagen)
          }
        }
      }
    });
    console.log("Archivos a enviar: ", imagenesTMP);
    
    if (this.area != null && this.rubro != null) {
      this.archivosService.postArchivos(archivos, this.area.idArea, this.rubro.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.router.navigate([NAVEGACION.home]);
            break;
          case 204:
            break;
        }
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    } else {
      this.spinner.hide();
    }
  }

  public borrarImagen(imagen: Archivo) {
    this.imagenes.forEach((element, index) => {
      if (element == imagen){
        if(imagen.refUid != null && imagen.refUid != undefined && imagen.refUid != ''){
          this.deleteImagen(imagen.refUid);
        }
        this.imagenes.splice(index, 1);
        
      }
    });
  }

  get navegacion() {
    return NAVEGACION;
  }

  deleteImagen(refUid : string){
    this.archivosService.putArchivo(refUid).subscribe((response: any) => {
      this.spinner.hide();
      switch (response.status) {
        case 200:
          if (this.area != null && this.rubro != null) {
            this.getRubroAll();
          }else {
            this.getFilesAll();
          }

          break;
        case 204:
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }


  openImagen(index: number){

    let testarray = (document).getElementsByClassName("imagenes-mostrar"); 
    for(var i = 0; i < testarray.length; i++){
       testarray.item(i).className += " hide";
    }    
    
    if(this.indexImagenSeleccionada == index){
      document.getElementById("imagen-div-"+index).classList.add('hide');
      this.indexImagenSeleccionada = null;
    }else{
      document.getElementById("imagen-div-"+index).classList.remove('hide');
      this.indexImagenSeleccionada = index;
    }

  }


  public incomingfile(files: Array<any>) {
    this.limpiarMensajes();
    console.log("Imagenes antes de incomingFile", this.imagenes);
    
    for (const fs of files) {
      if (fs != null) {
        let imagen: Archivo = new Archivo();

        if (fs instanceof File) {
          imagen.file = fs;
          imagen.fileName = fs.name;
          imagen.fileSize = fs.size;
          imagen.fileType = fs.type;
          imagen.area = this.area?.area;
          imagen.rubro = this.rubro?.rubro;

        } else {
          imagen.file = new File([this.b64toBlob(fs.archivo,fs.fileType)],fs.fileName);
          imagen.fileName = fs.fileName;
          imagen.fileSize = fs.fileSize;
          imagen.fileType = fs.fileType;
          imagen.area = fs.area;
          imagen.rubro = fs.rubro;
          imagen.refUid = fs.refUid;

        }

        // if (!(imagen.fileType == 'image/jpeg' || imagen.fileType == 'image/png')) {
        //   this.fileTypeIncorrect = true;
        //   return;
        // }
         if (imagen.fileSize >= 3145728) {
          this.fileSizeIncorrect = true;
          return;
        }
        else {
          const reader = new FileReader();
          reader.readAsDataURL(imagen.file);
          reader.onload = () => {
            imagen.archivo = reader.result;
            // imagen.download = false;
            this.imagenes.push(imagen);
          }
        }
      }
    }
    console.log("Imagenes despues de incomingFile", this.imagenes);
  }

  public incomingfileDownload(files: Array<any>) {
    this.limpiarMensajes();
    
    for (const fs of files) {
      if (fs != null) {
        let imagen: Archivo = new Archivo();

        if (fs instanceof File) {
          imagen.file = fs;
          imagen.fileName = fs.name;
          imagen.fileSize = fs.size;
          imagen.fileType = fs.type;
          imagen.area = this.area?.area;
          imagen.rubro = this.rubro?.rubro;

        } else {
          imagen.file = new File([this.b64toBlob(fs.archivo,fs.fileType)],fs.fileName);
          imagen.fileName = fs.fileName;
          imagen.fileSize = fs.fileSize;
          imagen.fileType = fs.fileType;
          imagen.area = fs.area;
          imagen.rubro = fs.rubro;
          imagen.refUid = fs.refUid;

        }

        // if (!(imagen.fileType == 'image/jpeg' || imagen.fileType == 'image/png')) {
        //   this.fileTypeIncorrect = true;
        //   return;
        // }
         if (imagen.fileSize >= 3145728) {
          this.fileSizeIncorrect = true;
          return;
        }
        else {
          const reader = new FileReader();
          reader.readAsDataURL(imagen.file);
          reader.onload = () => {
            imagen.archivo = reader.result;
            imagen.download = true;
            this.imagenes.push(imagen);
          }
        }
      }
    }
    console.log("imagenes obtenidas",this.imagenes);
  }
  
  openArchivo(data){
    this.imagenFileData = "";
    this.pdfFileData = "";
    if(data.fileType == 'image/jpeg' || data.fileType == 'image/png'){
      this.imagenFileData = data.archivo;
      this.nombreFileData = data.fileName;
    }else{
      let base64result = data.archivo.split(';base64,')[1];
      this.pdfFileData = "data:application/pdf;base64,"+base64result;
    }
  }
  
}
