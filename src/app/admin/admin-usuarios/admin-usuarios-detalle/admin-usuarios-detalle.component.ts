import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { MENSAJES_NEGOCIO} from 'src/app/shared/constants/global';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { EstadisticasService } from 'src/app/shared/services/estadisticas/estadisticas.service';
import { AdminUsuariosService } from 'src/app/shared/services/admin-usuarios/admin-usuarios.service';
import {AlertService} from "src/app/shared/services/alert/alert.service";
import { CustomValidator } from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-admin-usuarios-detalle',
  templateUrl: './admin-usuarios-detalle.component.html',
  styleUrls: ['./admin-usuarios-detalle.component.css']
})
export class AdminUsuariosDetalleComponent implements OnInit {

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() reinicar = new EventEmitter<boolean>();
  @Input() idUsuario: number;

  form: FormGroup;
  total : number = 0;
  page: number = 0;

  public validarFormulario: boolean;
  public passNoCoincide: boolean;

  constructor(private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private catalogoService: CatalogosService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private autenticacionService: AutenticacionService,
    private estadisticasService: EstadisticasService,
    private adminUsuariosService: AdminUsuariosService) { }

  ngOnInit(): void {
    this.crearFormularioDescarga();
    this.getPerfiles();
    this.getUsuario();
    this.getCluesAsignadas(0);
    this.getEntidadesFederativas();
  }

  private crearFormularioDescarga(){

      this.form = this.formBuilder.group({
        nombre: [null, Validators.compose([Validators.required])],
        apellidoPaterno: [null, Validators.compose([Validators.required])],
        apellidoMaterno: [null, Validators.compose([Validators.required])],
        usuario: [null, Validators.compose([Validators.required])],
        matricula: [null, Validators.compose([Validators.required])],
        perfil: [null, Validators.compose([Validators.required])],
        clues : [null],
        idEntidad : [null],
        idNivel : [null],
        password: [''],
        confirmPassword: ['']
      });
    
   

    this.form.get('idEntidad').valueChanges.subscribe(idEntidad => { 
      if(!this.isEmpty(idEntidad)){
        //llamar
        this.getClues(idEntidad);
      }else{

      }
    });


  }

  usuario: any;

  getUsuario() : void{
    this.spinner.show();
    this.adminUsuariosService.getAdminUsuariosById(this.idUsuario).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.usuario = response.body.data;
            this.form.controls['nombre'].setValue(this.usuario.nombre);
            this.form.controls['apellidoPaterno'].setValue(this.usuario.primerApellido);
            this.form.controls['apellidoMaterno'].setValue(this.usuario.segundoApellido);
            this.form.controls['usuario'].setValue(this.usuario.cveUsuario);
            this.form.controls['matricula'].setValue(this.usuario.cveMatricula);
            this.form.controls['perfil'].setValue(this.usuario.perfil);
            break;
          case 204:
            this.usuario = {};
            break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
  }

  perfiles : any;

  getPerfiles(){
    this.spinner.show();
    this.adminUsuariosService.getPerfilesUsuario().subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.perfiles = response.body;
            break;
          case 204:
            this.perfiles = [];
            break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
  }

  clues : any;
  listaClues: any;
  isExisteCluesEntidad : boolean = false;

  getClues(idEntidad: any){
    this.spinner.show();
    this.adminUsuariosService.getCluesByEntidad(idEntidad).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.listaClues = response.body.data;
            this.isExisteCluesEntidad = true;
            break;
          case 204:
            this.listaClues = [];
            this.alertService.showAlertError('No se encontraron clues para esta Entidad Federativa.');
            this.isExisteCluesEntidad = false;
            break;
        }
  
    }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }


  //getAdminUsuariosCluesUsuario
  cluesUsuariosAsignados: any;

  getCluesAsignadas(page: any){
    this.page = page;
    this.cluesUsuariosAsignados = [];
    this.spinner.show();
    this.adminUsuariosService.getCluesAsignadasUsuario(this.idUsuario,this.page,10).subscribe((response: any) => {
        
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.cluesUsuariosAsignados = response.body.data.clues;
            this.total = parseInt(response.body.data.totalItems);
            break;
          case 204:
            this.cluesUsuariosAsignados = [];
            break;
        }
      }, (err: any) => {
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
  }

  pageChanged(page) {
    this.page = page - 1;
    this.getCluesAsignadas(this.page);
  }

  actualizar(){

    this.validarFormulario = true;
    this.passNoCoincide = false;
    if(this.form.controls['password'].value.length > 0 || this.form.controls['confirmPassword'].value.length > 0){
        const password: string = this.form.get('password').value;
        const confirmPassword: string = this.form.get('confirmPassword').value;

        if (password != confirmPassword) {
          this.form.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }else{
          this.form.get('confirmPassword').setErrors(null);
        }

    }else{
      this.form.get('confirmPassword').setErrors(null);
    }

    if (this.form.invalid) {
      return;
    }

    this.usuario.nombre = this.form.controls['nombre'].value;
    this.usuario.primerApellido = this.form.controls['apellidoPaterno'].value;
    this.usuario.segundoApellido = this.form.controls['apellidoMaterno'].value;
    this.usuario.cveUsuario = this.form.controls['usuario'].value;
    this.usuario.cveMatricula = this.form.controls['matricula'].value;
    this.usuario.perfil = this.form.controls['perfil'].value;

    this.spinner.show();
    this.adminUsuariosService.putUsuarios(this.usuario,this.form.controls['confirmPassword'].value).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.usuario = response.body.data;
            this.modalDialogService.showDialog('Atención', "Error",response.body.data.message, () => { });
            this.validarFormulario = false;
            this.form.controls['password'].setValue('');
            this.form.controls['confirmPassword'].setValue('');
            this.form.get('confirmPassword').setErrors(null);
            break;
          case 204:
            this.validarFormulario = false;
            this.modalDialogService.showDialog('Atención', "Error",response.body.data.message, () => { });
            break;
            }
        }, (err: any) => {
          this.validarFormulario = false;
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });

  }

  eliminarClues(clues : any){
    console.log("clues->" , clues);
    this.updateAsingacionClues(clues.idUsuarioSinerhias);
  }

  asignar(){

    let idEntidad = this.form.controls['idEntidad'].value;
    let idClues = this.form.controls['clues'].value;
    if(idEntidad != null && idEntidad != undefined ){

      if(idClues != null && idClues != undefined ){
        
        let data = {
          idRegistro: 0,
          idUsuario: this.idUsuario,
          idClues: this.form.controls['clues'].value,
          usuarioCarga: "",
          idUpdate: 0
        };
    
        this.spinner.show();
        this.adminUsuariosService.updateUsuarioCluesAsignacion(data).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                console.log("response->" ,response.body);
                break;
              case 204:
                this.usuario = {};
                break;
                }
            }, (err: any) => {
                this.spinner.hide();
                this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            }, () =>{
              this.getCluesAsignadas(0);
            });

      }else{
        this.alertService.showAlertError('Selecciona CLUES.');
        return;
      }

    }else{
      this.alertService.showAlertError('Selecciona Entidad Federativa.');
      return;
    }

  
  }


  updateAsingacionClues(clues: number){
    
    let data = {
      idRegistro: clues,
      idUsuario: this.idUsuario,
      idClues: 0,
      usuarioCarga: "",
      idUpdate: 1
    };

    this.spinner.show();
    this.adminUsuariosService.updateUsuarioCluesAsignacion(data).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            console.log("response->" ,response.body);
            break;
          case 204:
            this.usuario = {};
            break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        }, () =>{
          this.getCluesAsignadas(0);
        });

  }

  listaEntidades: any;
  getEntidadesFederativas() : void{
    this.spinner.show();
    this.catalogoService.getEntidadesFederativas(1,parseInt(this.autenticacionService.usuarioSesion.idPerfil)).subscribe((response: any) => {
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

  asignarEntidad(){
    let idEntidad = this.form.controls['idEntidad'].value;
    if(idEntidad != null && idEntidad != undefined ){

      if(this.isExisteCluesEntidad){
        console.log("Agregar");

        let data = {
          idRegistro: 0,
          idUsuario: this.idUsuario,
          idClues: this.form.controls['clues'].value,
          usuarioCarga: "",
          idUpdate: 2,
          idEntidad: idEntidad
        };
    
        this.spinner.show();
        this.adminUsuariosService.updateUsuarioCluesAsignacion(data).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                console.log("response->" ,response.body);
                break;
              case 204:
                this.usuario = {};
                break;
                }
            }, (err: any) => {
                this.spinner.hide();
                this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            }, () =>{
              this.getCluesAsignadas(0);
            });

      }else{
        this.alertService.showAlertError('No se encontraron clues para esta Entidad Federativa.');
      }

    }else{
      this.alertService.showAlertError('Seleccionar primero Entidad Federativa.');
    }
  }

  asignarTodo(){

    let data = {
      idRegistro: 0,
      idUsuario: this.idUsuario,
      idClues: this.form.controls['clues'].value,
      usuarioCarga: "",
      idUpdate: 3
    };

    this.spinner.show();
    this.adminUsuariosService.updateUsuarioCluesAsignacion(data).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            console.log("response->" ,response.body);
            break;
          case 204:
            this.usuario = {};
            break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        }, () =>{
          this.getCluesAsignadas(0);
        });

  }

  isEmpty(value: any){
    if(value === null || value === 'null' || value === '' || value === 0 || value === undefined ){
        return true;
    }
    return false;
  }

  regresar() {
    window.scroll(0, 0);
    this.cerrar.emit(false);
    this.reinicar.emit(false);
  }

  get formulario() { return this.form.controls; }
  get mensaje() { return MENSAJES_NEGOCIO; }


}
