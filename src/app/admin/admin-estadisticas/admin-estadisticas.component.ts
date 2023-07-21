import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { EstadisticasService } from 'src/app/shared/services/estadisticas/estadisticas.service';
import { Estadisticas } from 'src/app/shared/model/estadisticas/estadisticas';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css']
})
export class AdminEstadisticasComponent implements OnInit {

    listaEntidades: EntidadFederativa[] = [];
    form: FormGroup;
    nombreUnidad: string = 'SIN SELECCIONAR';
    textRequerido = 'Este campo es obligatorio';
    listaEstadisticas : Estadisticas[] = null;
    listaEstadisticas2 : Estadisticas[] = null;
    listaClues: [] = [];
    listaPreguntasContestadas: [] = [];
    listaPreguntasFaltantes: [] = [];
    tabSeleccionada : number = 1;
    listaJurisdiccion: [] = [];
    total : number = 0;
    page: number = 1;
    total2 : number = 0;
    page2: number = 1;
    listaNivel = [{id:1, nombre: 'Primer Nivel'},{id:2,nombre:'Segundo Nivel'}];
    isMesa: boolean = false;
    validarFormulario = false;

    constructor(
        private spinner: NgxSpinnerService,
        private modalDialogService: ModalDialogService, 
        private router: Router,
        private catalogoService: CatalogosService,
        private estadisticasService: EstadisticasService,
        private formBuilder: FormBuilder,
        private autenticacionService: AutenticacionService) { 
            if(parseInt(this.autenticacionService.usuarioSesion.idPerfil) === 7){
                this.isMesa = true;
            }
        }

    ngOnInit(): void {
        this.crearFormulario();

        if(this.isMesa){
            this.getEntidadesFederativasMesaTrabajo();
        }else{
            this.getEntidadesFederativas();
        }
        //this.getJurisdicciones();
        this.changeTab(1);
        sessionStorage.removeItem('seccion');
        sessionStorage.setItem("seccion","Avances");
    }

    get formulario() {
        return this.form.controls;
    }

    private crearFormulario(){
        if(this.isMesa){
            this.form = this.formBuilder.group({
                idEntidad: [null, Validators.compose([Validators.required])]
            });
            return;
        }else{
            this.form = this.formBuilder.group({
                jurisdiccion: [null, Validators.compose([Validators.required])],
                idEntidad: [null, Validators.compose([Validators.required])],
                clues: [null, Validators.compose([Validators.required])],
                nivelAtencion: [null, Validators.compose([Validators.required])]
            });
        }
        
        this.form.get('idEntidad').valueChanges.subscribe(idEntidad => { 
            if(!this.isEmpty(idEntidad)){
                this.getClues();
                this.getJurisdicciones();
                this.form.get('clues').setValue(null);
                this.form.get('jurisdiccion').setValue(null);
                this.form.get('nivelAtencion').setValue(null);
            }else{
                this.listaClues = [];
                this.listaJurisdiccion = [];
                this.form.get('clues').setValue(null);
                this.form.get('jurisdiccion').setValue(null);
                this.form.get('nivelAtencion').setValue(null);
            }
        });

        this.form.get('jurisdiccion').valueChanges.subscribe(jurisdiccion => { 
            if(!this.isEmpty(jurisdiccion)){
                this.form.get('clues').setValue(null);
                this.getClues();
            }else{
                this.form.get('clues').setValue(null);
                this.listaClues = [];
            }
        });

        this.form.get('nivelAtencion').valueChanges.subscribe(nivelAtencion => { 
            if(nivelAtencion != null && nivelAtencion != 'null' && nivelAtencion != ''){
                this.form.get('clues').setValue(null);
                this.getClues();
            }else{
                this.form.get('clues').setValue(null);
                this.listaClues = [];
                this.getClues();
            }
        });

    }

    getEntidadesFederativas() : void{
        this.spinner.show();
        this.catalogoService.getEntidadesFederativas(1,parseInt(this.autenticacionService.usuarioSesion.idPerfil)).subscribe((response: any) => {
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
        },()=>{
            this.spinner.hide();
        });
    }

    getEntidadesFederativasMesaTrabajo() : void{
        this.spinner.show();
        this.catalogoService.getEntidadesFederativasMesaTrabajo(this.autenticacionService.usuarioSesion.idClues,this.autenticacionService.usuarioSesion.cveMatricula).subscribe((response: any) => {
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

    getJurisdicciones(){
        this.spinner.show();
        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        this.catalogoService.getJurisdiccion(idEntidad,parseInt(this.autenticacionService.usuarioSesion.idPerfil)).subscribe((response: any) => {
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

    getClues() : void{
        this.listaClues = [];
        this.spinner.show();

        let idNivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;


        this.catalogoService.getCluesByEntidad(this.form.get('idEntidad').value,parseInt(this.autenticacionService.usuarioSesion.idPerfil),this.form.get('jurisdiccion').value,idNivel).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                  
                this.listaClues = response.body;
                break;
              case 204:
                this.listaClues = [];
                break;
            }
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        },()=>{
           
        });
    }

    buscarCuestionarios(){
        if(this.tabSeleccionada == 1){
            this.getCuestionariosTotales(1);
            this.getCuestionarios();
        }else{
            this.getCuestionariosTotales(2);
            this.getCuestionarios2();
        }
    }

    buscarCuestionariosMesa(){
        this.validarFormulario = true;

        if (this.form.invalid) {
            return;
        }
        
        if(this.tabSeleccionada == 1){
            this.getCuestionariosTotalesMesaTrabajo(1);
            this.getCuestionarios();
        }else{
            this.getCuestionariosTotalesMesaTrabajo(2);
            this.getCuestionarios2();
        }
    }

    getCuestionarios() : void {
        this.spinner.show();
        this.spinner.show();
        
        let clues = null;
        let mesaTrabajo = 0;
        let idEntidad = null;
        let jurisdiccion = null;
        let idNivel = 0;

        if( this.isMesa ){
            clues = this.form.get('idEntidad').value;
            mesaTrabajo = 1;
        }else{

            idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
            jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
            idNivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;
            if(this.form.get('clues').value != null && this.form.get('clues').value != '' && this.form.get('clues').value != undefined && this.form.get('clues').value != 'null'){
                let clues_split = (this.form.get('clues').value).split("-");
                clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];
            }
        }

        this.estadisticasService.getEstadisticas(
                clues,
                jurisdiccion,
                idEntidad,this.page, idNivel,mesaTrabajo
                ).subscribe((response: any) => {

            this.spinner.hide();
            switch (response.status) {
              case 200:
                this.listaEstadisticas = response.body;
                this.changeTab(1);
                break;
              case 204:
                this.listaEstadisticas = [];
                this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
                break;
            }
            this.validarFormulario = false;
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }

    getCuestionarios2() : void {
        this.spinner.show();
        this.spinner.show();

        let clues = null;
        let mesaTrabajo = 0;
        let idEntidad = null;
        let jurisdiccion = null;
        let idNivel = 0;

        if( this.isMesa ){
            clues = this.form.get('idEntidad').value;
            mesaTrabajo = 1;
        }else{

            idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
            jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
            idNivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;
            if(this.form.get('clues').value != null && this.form.get('clues').value != '' && this.form.get('clues').value != undefined && this.form.get('clues').value != 'null'){
                let clues_split = (this.form.get('clues').value).split("-");
                clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];
            }
        }
        
        this.estadisticasService.getEstadisticasNoClues(
            clues,
            jurisdiccion,
            idEntidad,this.page, idNivel,mesaTrabajo).subscribe((response: any) => {

            this.spinner.hide();
            switch (response.status) {
              case 200:
                this.listaEstadisticas2 = response.body;
                break;
              case 204:
                this.listaEstadisticas2 = [];
                this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
                break;
            }
            this.validarFormulario = false;
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            this.validarFormulario = false;
        });
    }

    getCuestionariosTotales(tipo: number): void {
        
        this.spinner.show();
        this.spinner.show();
      
        let clues = null;
        if(this.form.get('clues').value != null && this.form.get('clues').value != '' && this.form.get('clues').value != undefined && this.form.get('clues').value != 'null'){
            let clues_split = (this.form.get('clues').value).split("-");
            clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];
        }

        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        let jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
        let idNivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;

        this.estadisticasService.getEstadisticasTotal(clues,
            jurisdiccion,
            idEntidad,tipo,idNivel).subscribe((response: any) => {

            
            switch (response.status) {
                case 200:
                    if(tipo == 1){
                        this.total = response.body.total;
                    }else{
                        this.total2 = response.body.total;
                    }
                    
                    break;
                case 204:
                    break;
            }
            this.validarFormulario = false;
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            this.validarFormulario = false;
        });
    }

    getCuestionariosTotalesMesaTrabajo(tipo: number): void {
        
        this.spinner.show();
        this.spinner.show();
        this.estadisticasService.getEstadisticasTotalMesaTrabajo(this.form.get('idEntidad').value,tipo).subscribe((response: any) => {
            switch (response.status) {
                case 200:
                    if(tipo == 1){
                        this.total = response.body.total;
                    }else{
                        this.total2 = response.body.total;
                    }
                    break;
                case 204:
                    break;
            }
            this.validarFormulario = false;
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            this.validarFormulario = false;
        });
    }

    preguntasContestadas(clues: string){
        this.spinner.show();
        this.spinner.show();
        this.estadisticasService.getPreguntasRespuestas(clues,0).subscribe((response: any) => {
          this.spinner.hide();
          this.listaPreguntasContestadas = response.body.preguntasRespuestas;
        }, (err: any) => {
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        },() => {
        });
    }

    preguntasFaltantes(clues: string){
        this.spinner.show();
        this.spinner.show();
        this.estadisticasService.getPreguntasFaltantes(clues,0).subscribe((response: any) => {
          this.spinner.hide();
          this.listaPreguntasFaltantes = response.body.preguntasFaltantes;
        }, (err: any) => {
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        },() => {
        });
    }

    preguntasContestasdasEntidad(){
        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        if(idEntidad != 0){
            this.spinner.show();
            this.spinner.show();
            this.estadisticasService.getPreguntasRespuestas('0',idEntidad).subscribe((response: any) => {
                this.spinner.hide();
                this.listaPreguntasContestadas = response.body.preguntasRespuestas;
            }, (err: any) => {
                this.spinner.hide();
                this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            },() => {
            });
        }
    }

    preguntasFaltantesEntidad(){
        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        if(idEntidad != 0){
            this.spinner.show();
            this.spinner.show();
            this.estadisticasService.getPreguntasFaltantes('0',idEntidad).subscribe((response: any) => {
              this.spinner.hide();
              this.listaPreguntasFaltantes = response.body.preguntasFaltantes;
            }, (err: any) => {
              this.spinner.hide();
              this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            },() => {
            });
        }
    }

    changeTab(numeroTab: number): void {
        this.tabSeleccionada = numeroTab;
        if (this.tabSeleccionada == 2) {
            this.getCuestionariosTotales(2);
            this.getCuestionarios2();
        }
    }

    irHome(clave,modulo,referencia){
        sessionStorage.setItem("idClues",clave);
        sessionStorage.setItem("idModulo",modulo);
        sessionStorage.setItem("refClue",referencia);
        sessionStorage.setItem("bloqueo","1");
        this.router.navigate([NAVEGACION.home]);
    }

    irPreguntasFases(clues){
        this.router.navigateByUrl(NAVEGACION.fases, { state: { clues: clues} });
    }

    pageChanged(page) {
        this.page = page;
        this.getCuestionarios();
    }

    pageChanged2(page) {
        this.page2 = page;
        this.getCuestionarios2();
    }

    isEmpty(value: any){
        if(value === null || value === 'null' || value === '' || value === 0 || value === undefined ){
            return true;
        }

        return false;
    }
    
}