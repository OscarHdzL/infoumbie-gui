import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { Estadisticas } from 'src/app/shared/model/estadisticas/estadisticas';
import { ArchivosService } from 'src/app/shared/services/archivos/archivos.service';
import { Archivo } from 'src/app/shared/model/archivo/archivo';
import { DomSanitizer } from '@angular/platform-browser';
import { CatalogosConsultaService } from 'src/app/shared/services/catalogos/catalogos-consulta.service';
import { EstadisticasConsultaService } from 'src/app/shared/services/estadisticas/estadisticas-consulta.service';

@Component({
  selector: 'app-admin-consulta-cedulas-detalle',
  templateUrl: './admin-cedulas-detalle.component.html',
  styleUrls: ['./admin-cedulas-detalle.component.css']
})
export class AdminConsultaCedulasDetalleComponent implements OnInit {

  @Input() token: string;
  @Input() rol: string;

  @Input() entidadFederativa: string;
  @Input() nivelAtencion: string;
  @Input() clues: string;
  @Input() jurisdiccion: string;
  @Input() municipio: string;
  @Input() nombreUnidad: string;
  @Input() idNivel: string;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() reinicar = new EventEmitter<boolean>();

  constructor(private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private catalogoService: CatalogosConsultaService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private estadisticasService: EstadisticasConsultaService,
    private archivosService: ArchivosService,
    private sanitizer: DomSanitizer) { }


  listaCedulas: any = [];
  listaPreguntas: any = null;
  cedula: string = null;
  imagenes: Archivo[] = null;
  imagenesGlobal: Archivo[] = [];
  docs: any[] = [];
  fileSizeIncorrect: boolean;
  fileTypeIncorrect: boolean;
  area: any = null;
  rubro: any = null;
  total : number = 0;
  page: number = 1;
  slideIndex = 1;
  imagenFileData: any;
  isMostrarSpinner: boolean = false;

  ngOnInit(): void {
    this.getCedulas();
  }

  getTotalCedulas() {
    this.spinner.show();
    this.estadisticasService.getEstadisticasCedulaPreguntasTotal(this.token,this.clues, this.cedula).subscribe((response: any) => {
      
      switch (response.status) {
        case 200:
          
          this.total = response.body.total;
          break;
        case 204:
          
          this.listaPreguntas = [];
          this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
          break;
      }

    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    }, () =>{
      
      this.getCedulas();
    });
  }

  getCedulas() {
    this.spinner.show();
    this.catalogoService.getCedulas(this.token,this.clues).subscribe((response: any) => {
      
      switch (response.status) {
        case 200:
          
          this.listaCedulas = response.body;
          break;
        case 204:
          
          this.listaCedulas = [];
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    }, () =>{
      
      this.getCuestionarios();
    });
  }

  mostrarDes(){
    this.page = 1;
    this.total = 0;
    //this.getTotalCedulas();
    this.getCuestionarios();
  }

  getCuestionarios(): void {
    this.spinner.show();
    this.estadisticasService.getEstadisticasCedulaPreguntas(this.token,this.clues, this.cedula, this.page).subscribe((response: any) => {
      switch (response.status) {
        case 200:
          this.listaPreguntas = response.body;
          break;
        case 204:
          this.listaPreguntas = [];
          this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    }, () =>{
      
      if(this.imagenes != null || this.imagenes?.length > 0 ){
        this.spinner.hide();
      }

      this.getFilesAll();
    });
  }

  getFilesAll() {
    
    this.isMostrarSpinner = true;

    if(this.imagenes == null || this.imagenes?.length == 0 ){
      this.archivosService.getAll(null, this.clues, null, 0).subscribe(async (response: any) => {  
        switch (response.status) {
          case 200:
            
            if (response.body != null) {
              response.body.forEach(element => {
                if (element.fileType == 'image/jpeg' || element.fileType == 'image/png') {
                  this.imagenesGlobal.push(element);
                }
              });
              this.imagenes = [];
              await this.incomingfile().then(() => {
                console.log("Termine de hacer archivos");
                return;
              });
            }
            break;
          case 204:
            this.imagenes = [];
            break;
        }
  
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      },()=>{
        this.spinner.hide();
      });
    }
    
  }

  public async incomingfile(files: Array<any> = this.imagenesGlobal): Promise<any> {

    if (!files || files?.length == 0) return;

    const fs = new Archivo(files[this.slideIndex - 1]);
    this.imagenes = [];
    if (fs != null) {
      let imagen: Archivo = new Archivo();

      imagen.file = new File([this.b64toBlob(fs.archivo, fs.fileType)], fs.fileName);
      imagen.fileName = fs.fileName;
      imagen.fileSize = fs.fileSize;
      imagen.fileType = fs.fileType;
      imagen.area = fs.area;
      imagen.rubro = fs.rubro;
      imagen.refUid = fs.refUid;

      if (imagen.fileType == 'image/jpeg' || imagen.fileType == 'image/png') {
        const reader = new FileReader();
        reader.readAsDataURL(imagen.file);
        reader.onload = () => {

          imagen.archivo = reader.result;
          imagen.download = false;
          this.imagenes.push(imagen);
        }
      }
    }
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

  public sanitize(image: any) {
    if(!image) return;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  regresar() {
    window.scroll(0, 0);
    this.cerrar.emit(false);
    this.reinicar.emit(false);
  }

  pageChanged(page) {
    this.page = page;
    this.getCuestionarios();
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {

    let slides : any = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('displayNone');
      slides[i].classList.remove('displayBlock');
    }

    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add('displayNone');
    }

    slides[this.slideIndex - 1].classList.add('displayBlock');
  }

  public ngForCallback() {
    this.showSlides(this.slideIndex);
  }

  mostrarImagen(imagen: any){
    this.imagenFileData = imagen;
  }

  restablecerDatos(){
    
    if(this.cedula == null || this.cedula == 'null'){
      this.cedula = null;
      this.page = 1;
      this.total = 0;
      this.getTotalCedulas();
    }
  }

  isEmpty(value: any){
    return !value;
  }

}
