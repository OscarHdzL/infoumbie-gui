import { Component, OnInit , AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CatalogosConsultaPublicService } from 'src/app/shared/services/catalogos/catalogos-consulta-pubic.service';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { ArchivosPublicService } from 'src/app/shared/services/archivos/archivos-public.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { Archivo } from 'src/app/shared/model/archivo/archivo';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-clues',
  templateUrl: './admin-clues.component.html',
  styleUrls: ['./admin-clues.component.css']
})
export class AdminCluesPublicComponent implements OnInit ,  AfterViewChecked  {

    nombreUnidadDescarga: string = 'SIN SELECCIONAR';
    nombreUnidadReseteo:  string = 'SIN SELECCIONAR';

    listaEntidades: EntidadFederativa[] = [];
    formDescarga: FormGroup;
    formReseteo: FormGroup;
    listaCluesDescarga : [] = [];
    listaCluesReseteo : [] = [];
    listaJurisdiccion: [] = [];

    public imagenes: Archivo[] = null;
    public docs: any[] = [];
    public fileTypeIncorrect: boolean;
    public fileSizeIncorrect: boolean;
    public fileIsValid: boolean = false;

    imagenFileData = "";
    pdfFileData = "";
    nombreFileData = "";

    items: any = [];

    public pageOfItems: Array<any>;

    listaNivel = [{id:1, nombre: 'Primer Nivel'},{id:2,nombre:'Segundo Nivel'}];


    constructor(
        private spinner: NgxSpinnerService,
        private modalDialogService: ModalDialogService, 
        private router: Router,
        private catalogoService: CatalogosConsultaPublicService,
        private formBuilder: FormBuilder,
        private archivosService: ArchivosPublicService,
        private autenticacionService : AutenticacionService,
        private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.getEntidadesFederativas();
        this.crearFormularioDescarga();
    }

    ngAfterViewChecked() : void {

      let elements = Array.from(document.getElementsByClassName('navbar') as HTMLCollectionOf<HTMLElement>)
        elements.forEach((element) => {
            element.style.display = 'none';
        });

        let elements2 = Array.from(document.getElementsByClassName('main-footer') as HTMLCollectionOf<HTMLElement>)

        elements2.forEach((element) => {
            element.style.display = 'none';
        });


    }

    private crearFormularioDescarga(){
        this.formDescarga = this.formBuilder.group({
            idEntidadDescarga: [0, Validators.compose([Validators.required])],
            jurisdiccion: [null],
            cluesDescarga: [null, Validators.compose([Validators.required])],
            nivelAtencion: [null, Validators.compose([Validators.required])]

        });

        this.formDescarga.get('idEntidadDescarga').valueChanges.subscribe(idEntidad => { 
            this.listaCluesDescarga = [];
            this.formDescarga.get('cluesDescarga').setValue(null);
            if(this.formDescarga.get('cluesDescarga').value && this.formDescarga.get('idEntidadDescarga').value){
                //this.getNombreUnidadDescarga(this.formDescarga.get('cluesDescarga').value,idEntidad);
            }

            if(this.formDescarga.get('idEntidadDescarga').value){
                this.getCluesDescargar();
            }
            
        });

        this.formDescarga.get('idEntidadDescarga').valueChanges.subscribe(idEntidad => { 
          if(idEntidad != null && idEntidad != 'null' && idEntidad != ''){
              this.formDescarga.get('cluesDescarga').setValue(null);
              this.formDescarga.get('jurisdiccion').setValue(null);
              this.formDescarga.get('nivelAtencion').setValue(null);
              this.getCluesDescargar();
              this.getEntidadesFederativas();
              this.getJurisdicciones();
          }else{
              this.listaCluesDescarga = [];
              this.getJurisdicciones();
          }
      });

        this.formDescarga.get('jurisdiccion').valueChanges.subscribe(jurisdiccion => { 
          if(jurisdiccion != null && jurisdiccion != 'null' && jurisdiccion != ''){
              this.formDescarga.get('cluesDescarga').setValue(null);
              this.getCluesDescargar();
          }else{
              this.formDescarga.get('cluesDescarga').setValue(null);
              this.listaCluesDescarga = [];
          }
      });

      this.formDescarga.get('nivelAtencion').valueChanges.subscribe(nivelAtencion => { 
        if(nivelAtencion != null && nivelAtencion != 'null' && nivelAtencion != ''){
            this.formDescarga.get('cluesDescarga').setValue(null);
            this.getCluesDescargar();
        }else{
            this.formDescarga.get('cluesDescarga').setValue(null);
            this.listaCluesDescarga = [];
            this.getCluesDescargar();
        }
    });

        this.formDescarga.get('cluesDescarga').valueChanges.subscribe(clues => { 
            if(clues != null && clues != '' && clues.length == 11){
                if(this.formDescarga.get('cluesDescarga').value && this.formDescarga.get('idEntidadDescarga').value ){
                    //this.getNombreUnidadDescarga(clues,this.formDescarga.get('idEntidadDescarga').value);
                }
            }
            
        });
    }

    getJurisdicciones(){
      this.spinner.show();
      let idEntidad = this.formDescarga.get('idEntidadDescarga').value == null || this.formDescarga.get('idEntidadDescarga').value == '' || this.formDescarga.get('idEntidadDescarga').value == 'null' ? 0 : this.formDescarga.get('idEntidadDescarga').value;
      this.catalogoService.getJurisdiccion(idEntidad,4).subscribe((response: any) => {
          this.spinner.hide();
          switch (response.status) {
            case 200:
              this.listaJurisdiccion = response.body;
              break;
            case 204:
              this.listaJurisdiccion = [];
              break;
          }
      }, (err: any) => {
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
  }

    getEntidadesFederativas() : void{
        this.spinner.show();
        this.catalogoService.getEntidadesFederativas(1,4).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                this.listaEntidades = response.body;
                break;
              case 204:
                this.listaEntidades = [];
                break;
            }
      
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }

    getCluesDescargar(){
        this.spinner.show();
        this.spinner.show();
        this.spinner.show();

        let idNivel = this.formDescarga.get('nivelAtencion').value == null || this.formDescarga.get('nivelAtencion').value == '' || this.formDescarga.get('nivelAtencion').value == 'null' ? 0 : this.formDescarga.get('nivelAtencion').value;


        this.catalogoService.getCluesByEntidad(this.formDescarga.get('idEntidadDescarga').value,4,this.formDescarga.get('jurisdiccion').value,idNivel).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                this.listaCluesDescarga = response.body;
                break;
              case 204:
                this.listaCluesDescarga = [];
                break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }

    mostrar(){
        this.getTotalFiles();
        this.getFilesAll();
    }

    getFilesAll() {
        this.spinner.show();
        this.spinner.show();

        let clues = null;
        if(this.formDescarga.get('cluesDescarga').value != null && this.formDescarga.get('cluesDescarga').value != '' && this.formDescarga.get('cluesDescarga').value != undefined && this.formDescarga.get('cluesDescarga').value != 'null'){
            let clues_split = (this.formDescarga.get('cluesDescarga').value).split("-");
            clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];
        }
        //let idNivel = this.formDescarga.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;


        this.archivosService.getAll(0,clues,'imagen',this.page).subscribe((response: any) => {
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
              this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
              break;
          }
    
        }, (err: any) => {
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
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
    
            } else {
              imagen.file = new File([this.b64toBlob(fs.archivo,fs.fileType)],fs.fileName);
              imagen.fileName = fs.fileName;
              imagen.fileSize = fs.fileSize;
              imagen.fileType = fs.fileType;
              imagen.area = fs.area;
              imagen.rubro = fs.rubro;
              imagen.refUid = fs.refUid;
    
            }

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

    public sanitize(image: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    openImagen(data){
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

    onChangePage(pageOfItems: Array<any>) {
      window.scroll(0,0);
      this.pageOfItems = pageOfItems;
    }

    totalFiles : number = 0;
    page: number = 1;

    pageChanged(page) {
      this.page = page;
      this.getFilesAll();
    }

    getTotalFiles(){
      this.spinner.show();
      let clues_split = (this.formDescarga.get('cluesDescarga').value).split("-");
      let clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];

      this.archivosService.getFilesTotal(0,clues,'imagen').subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.totalFiles = response.body.total;
            break;
          case 204:
            this.imagenes = [];
            //this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
            break;
        }
  
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }

    isEmpty(value: any){
      if(value === null || value === 'null' || value === '' || value === 0 || value === undefined ){
          return true;
      }
      return false;
    }

}