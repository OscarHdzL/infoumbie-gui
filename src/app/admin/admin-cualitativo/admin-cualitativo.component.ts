import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';

@Component({
  selector: 'app-admin-cualitativo',
  templateUrl: './admin-cualitativo.component.html',
  styleUrls: ['./admin-cualitativo.component.css']
})
export class AdminCualitativoComponent implements OnInit {

    listaEntidades: EntidadFederativa[] = [];
    form: FormGroup;
    nombreUnidad: string = 'SIN SELECCIONAR';


    constructor(
        private spinner: NgxSpinnerService,
        private modalDialogService: ModalDialogService, 
        private router: Router,
        private catalogoService: CatalogosService,
        private formBuilder: FormBuilder) { }


    ngOnInit(): void {
        console.log("Holaaa estadistias");
        this.crearFormulario();
        this.getEntidadesFederativas();
    }

    private crearFormulario(){
        this.form = this.formBuilder.group({
            idEntidad: [0, Validators.compose([Validators.required])],
            clues: [null, Validators.compose([Validators.required])],
            nombre: [null, Validators.compose([Validators.required])],
            estatus: [null, Validators.compose([Validators.required])] 
        });

        this.form.get('idEntidad').valueChanges.subscribe(idEntidad => { 
            if(this.form.get('clues').value){
                this.getNombreUnidad(this.form.get('clues').value,idEntidad);
            }
        });

    }

    getEntidadesFederativas() : void{
        this.spinner.show();
        this.catalogoService.getEntidadesFederativas(1,null).subscribe((response: any) => {
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

    getNombreUnidad(clues:string , idEntidad: number): void{
        this.spinner.show();
        this.catalogoService.getNombreUnidad(clues,idEntidad).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                this.nombreUnidad = response.body.unidad;
                break;
              case 204:
                this.nombreUnidad = "";
                break;
            }
      
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }
    

}