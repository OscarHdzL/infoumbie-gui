import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminComponent implements OnInit {

    tabSeleccionada : number = 1;
    breadcrumb:  string = "Consulta";
    isMesa: boolean = false;

    constructor(
        private spinner: NgxSpinnerService,
        private modalDialogService: ModalDialogService, 
        private autenticacionService: AutenticacionService,
        private router: Router,private _Activatedroute:ActivatedRoute) {
            if(parseInt(this.autenticacionService.usuarioSesion.idPerfil) === 7){
                this.isMesa = true;
                this.tabSeleccionada = 2;
              }
         }

    ngOnInit(): void {
       
    }

    changeTab(numeroTab : number): void{
        this.tabSeleccionada = numeroTab;
    }

    get seccion(): string {
        return sessionStorage.getItem("seccion");
    }

}