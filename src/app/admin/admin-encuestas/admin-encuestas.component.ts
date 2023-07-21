import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import {FileUploadComponent} from "../../shared/common-components/file-upload/file-upload.component";
import {AlertService} from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-admin-encuestas',
  templateUrl: './admin-encuestas.component.html',
  styleUrls: ['./admin-encuestas.component.css']
})
export class AdminEncuestasComponent implements OnInit {

  form: FormGroup;
  
  listaAreas: [] = [];
  listaNivel: [] = [];
  listaRubrosPreguntas: [] = [];
  cveArea: number;
  disableBotonArea: boolean = true;
  disableBotonRubro: boolean = true;

  //Propiedades del modal
  area: any;
  infoRubro: any;

  @ViewChild('filePreguntas') fileComponent: FileUploadComponent;

  constructor(
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder,
    private adminEncuestasService: AdminEncuestasService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerNivel();
  }

  private crearFormulario(){
    this.form = this.formBuilder.group({
      nivel: [null, Validators.compose([Validators.required])],
      area: [null, Validators.compose([Validators.required])],
    });

    this.form.get('nivel').valueChanges.subscribe(idNivel => {   
      this.obtenerAreas(idNivel);
      this.listaRubrosPreguntas = [];
      this.disableBotonArea = false; 
    });

    this.form.get('area').valueChanges.subscribe(cveArea => {      
      this.obtenerRubrosPreguntas(cveArea); 
      this.disableBotonRubro = false;
      this.listaAreas.forEach((e: any) => {        
        if(e.cveArea == cveArea){
          this.area = {
            desArea: e.desArea,
            cveArea: e.cveArea
          }
        }
      });      
    });
    
  }

  private obtenerNivel(){
    this.spinner.show();    
    this.adminEncuestasService.getNivel().subscribe((response: any) => {
      this.spinner.hide();
      this.listaNivel = response;
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }
  
  private obtenerAreas(idModulo: number){
    this.spinner.show();    
    this.adminEncuestasService.getAreas(idModulo).subscribe((response: any) => {
      this.spinner.hide();
      this.listaAreas = response;
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  private obtenerRubrosPreguntas(cveArea: number){
    this.spinner.show();    
    this.adminEncuestasService.getRubrosPreguntas(cveArea).subscribe((response: any) => {
      this.spinner.hide();
      this.listaRubrosPreguntas = response;
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  } 

  public agregarArea(){
    let infoArea = {
      title: 'Registrar nueva área',
      edit: false,
      area: {
        desArea: '',
        cveArea: null
      },
      cveModulo:  this.form.get("nivel").value,   
      cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario
    }

    this.adminEncuestasService.setDescripcion(infoArea);
  }

  public editarArea(){
    let infoArea = {
      title: 'Editar área',
      edit: true,
      area: this.area,
      cveModulo:  this.form.get("nivel").value,   
      cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario
    }

    this.adminEncuestasService.setDescripcion(infoArea);    
  }

  public eliminarArea(){
    this.adminEncuestasService.eliminarArea(this.area.cveArea).subscribe((response: any) => {      
      this.adminEncuestasService.setDescripcion(null);        
      this.alertService.showAlertSuccess('Eliminado exitosamente.'); 
      this.listaRubrosPreguntas = []; 
      this.obtenerAreas(Number(this.form.get('nivel').value));
      this.spinner.hide();     
    }, (err: any) => {
      this.spinner.hide();
      this.adminEncuestasService.setDescripcion(null);
      if(err.error.reasonPhrase != null){
        this.modalDialogService.showDialog('Atención', "Atención", err.error.reasonPhrase , () => { });
      }else{
        this.modalDialogService.showDialog('Atención', "Atención",MENSAJES_ERROR.http500 , () => { });
      }
    });
    
  }
  
  public agregarRubro(){
    let infoRubro = {
      title: 'Registrar nuevo rubro',
      edit: false,
      area: this.area.desArea,
      rubro: {
        cveArea: this.area.cveArea,
        desRubro: ''
      }
    };
    
    this.adminEncuestasService.setDescripcion(infoRubro);
  }

  public agregarPregunta(rubro: any){    
    let infoPregunta = {
      title: 'Registrar nueva pregunta',
      edit: false,
      area: this.area.desArea,
      cveRubro: rubro?.cveRubro ? rubro?.cveRubro : null,
      desRubro: rubro?.desRubro ? rubro?.desRubro : null,
      pregunta: {
        cveTipoRespuestaPregunta: null,
        desPregunta: ''
      }
    }

    this.adminEncuestasService.setDescripcion(infoPregunta);
  }  

  public crearRubro(rubro: any){
    let infoRubro = {
      cveRubro: rubro?.cveRubro,
      desRubro: rubro?.desRubro
    }
    return infoRubro;    
    
  }

  public subir(){

    if (this.area && this.area.cveArea) {
      this.spinner.show();
      if( this.fileComponent.getFiles() && this.fileComponent.getFiles().length > 0 ){

        const archivoFormData = new FormData();
        archivoFormData.append('cveArea', this.area.cveArea);
        archivoFormData.append('file', this.fileComponent.getFiles()[0]);

        this.adminEncuestasService.cargarPreguntas(archivoFormData).subscribe((response: any) => {

          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Atención", "Se han cargado las preguntas exitosamente.", () => { });
          this.obtenerRubrosPreguntas(this.area.cveArea);
        },(err: any) => {
          this.spinner.hide();
          if(err.error.reasonPhrase != null){
            this.modalDialogService.showDialog('Atención', "Atención", err.error.reasonPhrase , () => { });
          }else{
            this.modalDialogService.showDialog('Atención', "Atención",MENSAJES_ERROR.http500 , () => { });
          }

        },()=>{ });

      }else{
        this.spinner.hide();
        this.alertService.showAlertError('Seleccione un archivo excel para seguir con el registro.');
      }
    } else {
      this.alertService.showAlertError('Favor de seleccionar una Area.');
    }
  }

  public receiveMessage(evento: boolean) {    
    if(evento){
      this.obtenerAreas(Number(this.form.get('nivel').value));
      this.obtenerRubrosPreguntas(Number(this.form.get('area').value));      
    }
  }

}