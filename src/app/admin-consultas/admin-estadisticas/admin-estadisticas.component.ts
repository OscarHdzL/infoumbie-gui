import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosConsultaService } from 'src/app/shared/services/catalogos/catalogos-consulta.service';
import { EstadisticasConsultaService } from 'src/app/shared/services/estadisticas/estadisticas-consulta.service';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { Estadisticas } from 'src/app/shared/model/estadisticas/estadisticas';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-admin-consulta-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css']
})
export class AdminConsultaEstadisticasComponent implements OnInit {

    @Input() token: string;
    @Input() rol: number;

    listaEntidades: EntidadFederativa[] = [];
    form: FormGroup;
    nombreUnidad: string = 'SIN SELECCIONAR';
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

    constructor(
        private spinner: NgxSpinnerService,
        private modalDialogService: ModalDialogService, 
        private router: Router,
        private catalogoService: CatalogosConsultaService,
        private estadisticasService: EstadisticasConsultaService,
        private formBuilder: FormBuilder,
        private autenticacionService: AutenticacionService) { 
            
        }

    ngOnInit(): void {
        this.crearFormulario();
        this.getEntidadesFederativas();
        //this.getJurisdicciones();
        this.changeTab(1);
        console.log("ng init estadisticas");
        sessionStorage.removeItem('seccion');
        sessionStorage.setItem("seccion","Avances");
    }

    private crearFormulario(){
        this.form = this.formBuilder.group({
            jurisdiccion: [null, Validators.compose([Validators.required])],
            idEntidad: [null, Validators.compose([Validators.required])],
            clues: [null, Validators.compose([Validators.required])],
            nivelAtencion: [null, Validators.compose([Validators.required])]
        });

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
        this.catalogoService.getEntidadesFederativas(this.token,1,this.rol ).subscribe((response: any) => {
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

    getJurisdicciones(){
        this.spinner.show();
        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        this.catalogoService.getJurisdiccion(this.token,idEntidad,this.rol).subscribe((response: any) => {
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


        this.catalogoService.getCluesByEntidad(this.token,this.form.get('idEntidad').value,this.rol,this.form.get('jurisdiccion').value,idNivel).subscribe((response: any) => {
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

    getCuestionarios() : void {
        this.spinner.show();
        let clues = null;
        if(this.form.get('clues').value != null && this.form.get('clues').value != '' && this.form.get('clues').value != undefined && this.form.get('clues').value != 'null'){
            let clues_split = (this.form.get('clues').value).split("-");
            clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];
        }
        
        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        let jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
        let idNivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;


        this.estadisticasService.getEstadisticas(this.token,
                clues,
                jurisdiccion,
                idEntidad,this.page, idNivel
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

        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }

    getCuestionarios2() : void {
        this.spinner.show();

        let clues = null;
        if(this.form.get('clues').value != null && this.form.get('clues').value != '' && this.form.get('clues').value != undefined && this.form.get('clues').value != 'null'){
            let clues_split = (this.form.get('clues').value).split("-");
            clues = clues_split[0] == null || clues_split[0] == '' ? '' : clues_split[0];
        }

        let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
        let jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
        let idNivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;


        this.estadisticasService.getEstadisticasNoClues(this.token,
            clues,
            jurisdiccion,
            idEntidad,this.page, idNivel).subscribe((response: any) => {

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

        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
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

        this.estadisticasService.getEstadisticasTotal(this.token,clues,
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

        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }

    preguntasContestadas(clues: string){
        this.spinner.show();
        this.spinner.show();
        this.estadisticasService.getPreguntasRespuestas(this.token,clues,0).subscribe((response: any) => {
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
        this.estadisticasService.getPreguntasFaltantes(this.token,clues,0).subscribe((response: any) => {
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
            this.estadisticasService.getPreguntasRespuestas(this.token,'0',idEntidad).subscribe((response: any) => {
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
            this.estadisticasService.getPreguntasFaltantes(this.token,'0',idEntidad).subscribe((response: any) => {
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