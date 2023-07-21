import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { EstadisticasService } from 'src/app/shared/services/estadisticas/estadisticas.service';
import { Estadisticas } from 'src/app/shared/model/estadisticas/estadisticas';

@Component({
  selector: 'app-admin-cedulas',
  templateUrl: './admin-cedulas.component.html',
  styleUrls: ['./admin-cedulas.component.css']
})
export class AdminCedulasComponent implements OnInit {

  form: FormGroup;
  listaEntidades: EntidadFederativa[] = [];
  listaJurisdiccion: [] = [];
  listaUnidades: [] = [];
  listaEstadisticas : Estadisticas[] = null;
  isMostrarDetalle : boolean = false;
  entidadFederativa : string;
  nivelAtencion: string;
  clues: string;
  jurisdiccion: string;
  municipio: string;
  nombreUnidad: string;
  idNivel: string;
  total : number = 0;
  page: number = 1;

  listaNivel = [{id:1, nombre: 'Primer Nivel'},{id:2,nombre:'Segundo Nivel'}];

  constructor(
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService, 
    private router: Router,
    private catalogoService: CatalogosService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private estadisticasService: EstadisticasService) { 
      this.isMostrarDetalle = false;
    }

  ngOnInit(): void {
    this.crearFormulario();
    this.getEntidadesFederativas();
    
  }

  private crearFormulario(){
    this.form = this.formBuilder.group({
        jurisdiccion: [null, Validators.compose([Validators.required])],
        idEntidad: [18, Validators.compose([Validators.required])],
        nivelAtencion: [null, Validators.compose([Validators.required])],
        nombreUnidad: [null, Validators.compose([Validators.required])]
    });

    
    this.getJurisdicciones(18);
    this.getUnidades(this.form.get('idEntidad').value);

    this.form.get('idEntidad').valueChanges.subscribe(idEntidad => { 
      if(!this.isEmpty(idEntidad)){
        this.listaNivel = [{id:1, nombre: 'Primer Nivel'},{id:2,nombre:'Segundo Nivel'}];

        this.form.get('jurisdiccion').setValue(null);
        this.form.get('nombreUnidad').setValue(null);
        this.form.get('nivelAtencion').setValue(null);
        this.getJurisdicciones(idEntidad);
        this.getUnidades(idEntidad);
      }else{
        this.listaJurisdiccion = [];
        this.listaUnidades = [];
        this.listaUnidades = [];
        this.listaNivel = [];
        this.form.get('nivelAtencion').setValue(null);
        this.form.get('jurisdiccion').setValue(null);
        this.form.get('nombreUnidad').setValue(null);
      }
    });

    this.form.get('jurisdiccion').valueChanges.subscribe(idJurisdiccion => { 
      if(!this.isEmpty(idJurisdiccion)){
          this.form.get('nombreUnidad').setValue(null);
          this.form.get('nivelAtencion').setValue(null);
          this.getUnidades(this.form.get('idEntidad').value);
      }else{
        this.listaUnidades = [];
        this.form.get('nombreUnidad').setValue(null);
        this.form.get('nivelAtencion').setValue(null);
      }
    });

    this.form.get('nivelAtencion').valueChanges.subscribe(idNivel => { 
      if(!this.isEmpty(idNivel)){
          this.form.get('nombreUnidad').setValue(null);
          this.getUnidades(this.form.get('idEntidad').value);
      }
    });


  }

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

  getJurisdicciones(idEntidad){
      this.listaJurisdiccion = [];
      this.spinner.show();
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

  getUnidades(idEntidad){
    
    let jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
    let nivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;


    this.spinner.show();
    this.catalogoService.getUnidades(idEntidad,jurisdiccion,nivel  ).subscribe((response: any) => {
        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.listaUnidades = response.body;
            break;
          case 204:
            this.listaUnidades = [];
            break;
        }
    }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
}



  getCuestionarios() : void {

    this.getCuestionariosTotal();

    this.spinner.show();
    let clues = this.form.get('nombreUnidad').value == null || this.form.get('nombreUnidad').value == '' ? '' : this.form.get('nombreUnidad').value;
    let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
    let jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
    let nivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;

    this.estadisticasService.getEstadisticasCedulas(
            idEntidad,
            jurisdiccion,
            nivel,
            clues, 
            this.page
            ).subscribe((response: any) => {

        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.listaEstadisticas = response.body;
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

  getCuestionariosTotal() : void {
    this.spinner.show();
    let clues = this.form.get('nombreUnidad').value == null || this.form.get('nombreUnidad').value == '' ? '' : this.form.get('nombreUnidad').value;
    let idEntidad = this.form.get('idEntidad').value == null || this.form.get('idEntidad').value == '' || this.form.get('idEntidad').value == 'null' ? 0 : this.form.get('idEntidad').value;
    let jurisdiccion = this.form.get('jurisdiccion').value == null || this.form.get('jurisdiccion').value == '' || this.form.get('jurisdiccion').value == 'null' ? 0 : this.form.get('jurisdiccion').value;
    let nivel = this.form.get('nivelAtencion').value == null || this.form.get('nivelAtencion').value == '' || this.form.get('nivelAtencion').value == 'null' ? 0 : this.form.get('nivelAtencion').value;

    this.estadisticasService.getEstadisticasCedulasTotal(
            idEntidad,
            jurisdiccion,
            nivel,
            clues
            ).subscribe((response: any) => {

        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.total = response.body.total;
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


  mostrarDetalle(cuestionario : any){
    this.isMostrarDetalle = true;
    this.entidadFederativa = cuestionario.entidadFederativa;
    this.nivelAtencion = cuestionario.nivelAtencion;
    this.idNivel = cuestionario.idNivel;
    
    this.clues = cuestionario.clues;
    this.jurisdiccion = cuestionario.jurisdiccion
    this.municipio = cuestionario.municipio;
    this.nombreUnidad = cuestionario.nombreUnidad;

  }

  pageChanged(page) {
    this.page = page;
    this.getCuestionarios();
  }

  limpiar(){
    this.listaEstadisticas = [];
    this.listaEstadisticas = null;
    this.form.get('jurisdiccion').setValue(null);
    this.form.get('idEntidad').setValue(18);
    this.form.get('nivelAtencion').setValue(null);
    this.form.get('nombreUnidad').setValue(null);
  }

  isEmpty(value: any){
    if(value === null || value === 'null' || value === '' || value === 0 || value === undefined ){
        return true;
    }
    return false;
  }

}
