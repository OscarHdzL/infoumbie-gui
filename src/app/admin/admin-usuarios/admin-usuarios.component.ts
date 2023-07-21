import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { EstadisticasService } from 'src/app/shared/services/estadisticas/estadisticas.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import {AlertService} from "src/app/shared/services/alert/alert.service";
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUsuariosService } from 'src/app/shared/services/admin-usuarios/admin-usuarios.service';
import { FileUploadComponent } from 'src/app/shared/common-components/file-upload/file-upload.component';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  @ViewChild('file') fileComponent: FileUploadComponent;


  listaUsuarios: any;
  isMostrarDetalle : boolean = false;
  idUsuario: number;
  filtroUsuario: string = "";
  total : number = 0;
  page: number = 0;
  clues: any;

  constructor(
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private adminUsuariosService: AdminUsuariosService,
    private alertService: AlertService,  
  ) { }

  ngOnInit(): void {
    this.getUsuarios('',0);
  }

  getUsuarios(filtro: string , page: number ) : void{
    this.listaUsuarios = [];
    this.clues = null;
    this.filtroUsuario = filtro;
    this.page = page;
    this.spinner.show();
    this.adminUsuariosService.getUsuarios(filtro,page,5).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.listaUsuarios = response.body.data.usuarios;            
            this.clues = this.listaUsuarios.filter(elem => elem.baja != null)
            this.total = parseInt(response.body.data.totalItems);
            break;
          case 204:
            this.listaUsuarios = [];
            this.clues = null;
            break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
  }

  subir() {

    this.filtroUsuario = '';
    this.spinner.show();
    if( this.fileComponent.getFiles() && this.fileComponent.getFiles().length > 0 ){

      const archivoFormData = new FormData();
      archivoFormData.append('file', this.fileComponent.getFiles()[0], this.fileComponent.getFiles()[0].name);

      this.adminUsuariosService.enviarExcelUsuarios(archivoFormData).subscribe((response: any) => {

          this.spinner.hide();
          switch (response.status) {
            case 200:
              this.modalDialogService.showDialog('Atención', "Atención",response.body.message, () => { });
              this.getUsuarios('',0);
              break;
            case 204:
              this.modalDialogService.showDialog('Atención', "Atención", MENSAJES_ERROR.http204, () => { });
              break;
          }
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
  }

  mostrarDetalle(usuario: any){
    this.isMostrarDetalle = true;
    this.idUsuario = usuario.id;
  }

  limpiar(){
    this.getUsuarios('',0);
  }

  fnBuscarUsuario ($event: any) {
    this.filtroUsuario = $event.target.value;
    this.getUsuarios(this.filtroUsuario,this.page);
  }

  pageChanged(page) {
    this.page = page - 1;
    this.getUsuarios(this.filtroUsuario,this.page);
  }

}
