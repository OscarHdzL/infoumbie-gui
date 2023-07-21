import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { CatalogosConsultaService } from 'src/app/shared/services/catalogos/catalogos-consulta.service';

@Component({
  selector: 'app-admin-consulta-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminConsultaComponent implements OnInit {

    tabSeleccionada : number = 1;
    breadcrumb:  string = "Consulta";

    token : string = ""; 
    rol: number = 0;
    isTokenOk : boolean = false;

    constructor(
        private spinner: NgxSpinnerService,
        private modalDialogService: ModalDialogService, 
        private router: Router,private _Activatedroute:ActivatedRoute,
        private catalogoService: CatalogosConsultaService) { 
            sessionStorage.removeItem('consulta-admin');

        }

    ngOnInit(): void {
        this.token = this._Activatedroute.snapshot.queryParamMap.get('token');
        this.rol = parseInt(this._Activatedroute.snapshot.queryParamMap.get('rol'));
        console.log("token->" + this.token);
        console.log("rol->" + this.rol);
        if(this.token && this.rol != 0 ){
            this.prueba();
        }else{
            this.isTokenOk = true;
        }

    }


    prueba(){
        this.catalogoService.getPrueba(this.token).subscribe((response: any) => {
            console.log("response->" + response);
            this.isTokenOk = false;
        }, (err: any) => {
            console.log("err->" + err);
            this.isTokenOk = true;
        });
    }

    changeTab(numeroTab : number): void{
        this.tabSeleccionada = numeroTab;
    }

    get seccion(): string {
        return sessionStorage.getItem("seccion");
    }

    get tokenError() {
        let temp = sessionStorage.getItem('consulta-admin');
        return  temp == null || temp == '' || temp == undefined ? false : true;
    }

}
