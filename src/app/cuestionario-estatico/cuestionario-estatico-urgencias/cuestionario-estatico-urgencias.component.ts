import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { Area } from 'src/app/shared/model/area/area';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';
import { RUBROS } from 'src/app/shared/constants/global';
import { EIC_ESTATUS, MENSAJES_ERROR, MENSAJES_NEGOCIO, TIPO_AUTOCOMPLETE } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { UrgenciaMedica } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciaMedica/UrgenciaMedica';
import { UrgenciaMedicaCie10 } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciaMedica/UrgenciaMedicaCie10';
import { UrgenciaOtras } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciaOtras/UrgenciaOtras';
import { UrgenciaOtrasCie10 } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciaOtras/UrgenciaOtrasCie10';
import { UrgenciaPediatrica } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciaPediatrica/UrgenciaPediatrica';
import { UrgenciaPediatricaCie10 } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciaPediatrica/UrgenciaPediatricaCie10';
import { UrgenciaGinecologicas  } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciasGinecologicas/UrgenciasGinecologicas';
import { UrgenciaGinecologicasCie10 } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciasGinecologicas/UrgenciasGinecologicasCie10';
import { UrgenciaQuirurgicas } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciasQuirurgicas/UrgenciasQuirurgicas';
import { UrgenciaQuirurgicasCie10 } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/UrgenciasQuirurgicas/UrgenciasQuirurgicasCie10';

@Component({
  selector: 'app-cuestionario-estatico-urgencias',
  templateUrl: './cuestionario-estatico-urgencias.component.html',
  styleUrls: ['./cuestionario-estatico-urgencias.component.css']
})
export class CuestionarioEstaticoUrgenciasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService, private cuestionarioService: CuestionarioService,
    private autenticacionService: AutenticacionService) {
      this.createFormGroup();
  }

  @Input() rubroSeleccionado: Rubro;
  @Input() areaSeleccionada: Area;
  @Output() cierreRubro  = new EventEmitter<any>();
  public form: FormGroup;

  public indCuestionarioCerrado: boolean = false;

  public urgenciaMedica: UrgenciaMedica;
  public urgenciaMedicaCie10: UrgenciaMedicaCie10[];

  public urgenciaOtras: UrgenciaOtras;
  public urgenciaOtrasCie10: UrgenciaOtrasCie10[];

  public urgenciaPediatrica: UrgenciaPediatrica;
  public urgenciaPediatricaCie10: UrgenciaPediatricaCie10[];

  public urgenciaGinecologicas: UrgenciaGinecologicas;
  public urgenciaGinecologicasCie10: UrgenciaGinecologicasCie10[];

  public urgenciaQuirurgicas: UrgenciaQuirurgicas;
  public urgenciaQuirurgicasCie10: UrgenciaQuirurgicasCie10[];

  public urgenciaMensaje : string = "";
  public referencias = false;

  ngOnInit(): void {
    this.getCuestionario();
    switch(this.rubroSeleccionado.idRubro) {
      case this.rubros.URGENCIAS_MEDICAS_2DO_NIVEL:
        this.urgenciaMensaje = '1.- Cuáles fueron las 5 principales causas de urgencia médica (de acuerdo a catálogo CIE-10):';
        break;
      case this.rubros.URGENCIAS_GINE_2DO_NIVEL:
        this.urgenciaMensaje = '1.- Cuáles fueron las 5 principales causas de urgencia ginecológica (de acuerdo a catálogo CIE-10):';
        break;
      case this.rubros.URGENCIAS_OTRO_2DO_NIVEL:
        this.urgenciaMensaje = '1.- Cuáles fueron las 5 principales causas de otro tipo de urgencia (Con base al catalogo CIE-10):';
        break;
      case this.rubros.URGENCIAS_QUIRU_2DO_NIVEL:
        this.urgenciaMensaje = '1.- Cuáles fueron las 5 principales causas de urgencia quirúrgica (de acuerdo a catálogo CIE-10):';
        break;
      case this.rubros.URGENCIAS_PEDIATRICOS:
        this.urgenciaMensaje = '1.- Cuáles fueron las 5 principales causas de urgencia pediátrica (de acuerdo a catálogo CIE-10):';
        break;
    }
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      noAplica:[null] 
    });
  }

  private getCuestionario() {
    this.spinner.show();
    this.cuestionarioService.getCuestionarioEstatico(this.areaSeleccionada.idArea, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
      this.spinner.hide();
      this.indCuestionarioCerrado = false;
        switch (response.status) {
          case 200:
            
            switch(this.rubroSeleccionado.idRubro) {
              case this.rubros.URGENCIAS_MEDICAS_2DO_NIVEL:
                this.urgenciaMedica = response.body;
                this.urgenciaMedicaCie10 = this.urgenciaMedica.cie10UrgenciaMedica;
                this.form.get('noAplica').setValue(this.urgenciaMedica.noAplica != 1  ? false : true );  
                this.form.get('noAplica').updateValueAndValidity();

                if( this.urgenciaMedicaCie10?.length  > 0  ) {
                  this.form.controls['noAplica'].disable();
                }else {
                  this.form.controls['noAplica'].enable();
                }

                break;
              case this.rubros.URGENCIAS_GINE_2DO_NIVEL:
                this.urgenciaGinecologicas = response.body;
                this.urgenciaGinecologicasCie10 = this.urgenciaGinecologicas.cie10UrgenciaGinecologica;
                this.form.get('noAplica').setValue(this.urgenciaGinecologicas.noAplica != 1  ? false : true );  
                this.form.get('noAplica').updateValueAndValidity();

                if( this.urgenciaGinecologicasCie10?.length  > 0  ) {
                  this.form.controls['noAplica'].disable();
                }else {
                  this.form.controls['noAplica'].enable();
                }

                break;
              case this.rubros.URGENCIAS_OTRO_2DO_NIVEL:
                this.urgenciaOtras = response.body;
                this.urgenciaOtrasCie10 = this.urgenciaOtras.cie10OtrasUrgencias;
                this.form.get('noAplica').setValue(this.urgenciaOtras.noAplica != 1  ? false : true );  
                this.form.get('noAplica').updateValueAndValidity();

                if( this.urgenciaOtrasCie10?.length  > 0  ) {
                  this.form.controls['noAplica'].disable();
                }else {
                  this.form.controls['noAplica'].enable();
                }

                break;
              case this.rubros.URGENCIAS_QUIRU_2DO_NIVEL:
                this.urgenciaQuirurgicas = response.body;
                this.urgenciaQuirurgicasCie10 = this.urgenciaQuirurgicas.cie10UrgenciaQuirurgica;
                this.form.get('noAplica').setValue(this.urgenciaQuirurgicas.noAplica != 1  ? false : true );  
                this.form.get('noAplica').updateValueAndValidity();

                if( this.urgenciaQuirurgicasCie10?.length  > 0  ) {
                  this.form.controls['noAplica'].disable();
                }else {
                  this.form.controls['noAplica'].enable();
                }

                break;
              case this.rubros.URGENCIAS_PEDIATRICOS:
                this.urgenciaPediatrica = response.body;
                this.urgenciaPediatricaCie10 = this.urgenciaPediatrica.cie10UrgenciaPediatrica;
                this.form.get('noAplica').setValue(this.urgenciaPediatrica.noAplica != 1  ? false : true);  
                this.form.get('noAplica').updateValueAndValidity();

                if( this.urgenciaPediatricaCie10?.length  > 0  ) {
                  this.form.controls['noAplica'].disable();
                }else {
                  this.form.controls['noAplica'].enable();
                }

                break;
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

  public urgenciaListaCIE10(listaUrgenciasCie10: any[]){
    
    switch(this.rubroSeleccionado.idRubro){
      case this.rubros.URGENCIAS_MEDICAS_2DO_NIVEL:
        this.urgenciaMedicaCie10 = [];
        listaUrgenciasCie10.forEach(element => {
          let urgenciaMedicaCie = new UrgenciaMedicaCie10();
          urgenciaMedicaCie.idCie10 = element.idCie;
          urgenciaMedicaCie.refCie10 = element.refCie;
          urgenciaMedicaCie.urgenciaMedica = element.cie;
          this.urgenciaMedicaCie10.push(urgenciaMedicaCie);
        });
        this.guardarCuestionario();
        break;
      case this.rubros.URGENCIAS_GINE_2DO_NIVEL:
        this.urgenciaGinecologicasCie10 = [];
        listaUrgenciasCie10.forEach(element => {
          let urgenciaGineCie = new UrgenciaGinecologicasCie10();
          urgenciaGineCie.idCie10 = element.idCie;
          urgenciaGineCie.refCie10 = element.refCie;
          urgenciaGineCie.urgenciaGinecologica = element.cie;
          this.urgenciaGinecologicasCie10.push(urgenciaGineCie);
        });
        this.guardarCuestionario();
        break;
      case this.rubros.URGENCIAS_OTRO_2DO_NIVEL:
        this.urgenciaOtrasCie10 = [];
        listaUrgenciasCie10.forEach(element => {
          let urgenciaOtroCie = new UrgenciaOtrasCie10();
          urgenciaOtroCie.idCie10 = element.idCie;
          urgenciaOtroCie.refCie10 = element.refCie;
          urgenciaOtroCie.OtrasUrgencias = element.cie;
          this.urgenciaOtrasCie10.push(urgenciaOtroCie);
        });
        this.guardarCuestionario();
        break;
      case this.rubros.URGENCIAS_QUIRU_2DO_NIVEL:
        this.urgenciaQuirurgicasCie10 = [];
        listaUrgenciasCie10.forEach(element => {
          let urgenciaQuirurCie = new UrgenciaQuirurgicasCie10();
          urgenciaQuirurCie.idCie10 = element.idCie;
          urgenciaQuirurCie.refCie10 = element.refCie;
          urgenciaQuirurCie.urgenciaQuirurgica = element.cie;
          this.urgenciaQuirurgicasCie10.push(urgenciaQuirurCie);
        });
        this.guardarCuestionario();
        break;
      case this.rubros.URGENCIAS_PEDIATRICOS:
        this.urgenciaPediatricaCie10 = [];
        listaUrgenciasCie10.forEach(element => {
          let urgenciaPediCie = new UrgenciaPediatricaCie10();
          urgenciaPediCie.idCie10 = element.idCie;
          urgenciaPediCie.refCie10 = element.refCie;
          urgenciaPediCie.urgenciaPediatrica = element.cie;
          this.urgenciaPediatricaCie10.push(urgenciaPediCie);
        });
        this.guardarCuestionario();
        break;
    }
  }

  public guardarCuestionario() {
    
    this.spinner.show();

    let urgenciaPost: any;

    switch(this.rubroSeleccionado.idRubro) {
      case this.rubros.URGENCIAS_MEDICAS_2DO_NIVEL:
        
        urgenciaPost = new UrgenciaMedica();
        urgenciaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
        urgenciaPost.idArea = this.areaSeleccionada.idArea;
        urgenciaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
        urgenciaPost.idRubro = this.rubroSeleccionado.idRubro;
        urgenciaPost.cie10UrgenciaMedica = this.urgenciaMedicaCie10;
        

        break;
      case this.rubros.URGENCIAS_GINE_2DO_NIVEL:

        urgenciaPost = new UrgenciaGinecologicas();
        urgenciaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
        urgenciaPost.idArea = this.areaSeleccionada.idArea;
        urgenciaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
        urgenciaPost.idRubro = this.rubroSeleccionado.idRubro;
        urgenciaPost.cie10UrgenciaGinecologica = this.urgenciaGinecologicasCie10;
        break;

      case this.rubros.URGENCIAS_OTRO_2DO_NIVEL:
        urgenciaPost = new UrgenciaOtras();
        urgenciaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
        urgenciaPost.idArea = this.areaSeleccionada.idArea;
        urgenciaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
        urgenciaPost.idRubro = this.rubroSeleccionado.idRubro;
        urgenciaPost.cie10OtrasUrgencias = this.urgenciaOtrasCie10;
        break;

      case this.rubros.URGENCIAS_QUIRU_2DO_NIVEL:
        urgenciaPost = new UrgenciaQuirurgicas();
        urgenciaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
        urgenciaPost.idArea = this.areaSeleccionada.idArea;
        urgenciaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
        urgenciaPost.idRubro = this.rubroSeleccionado.idRubro;
        urgenciaPost.cie10UrgenciaQuirurgica = this.urgenciaQuirurgicasCie10;
        break;

      case this.rubros.URGENCIAS_PEDIATRICOS:
        urgenciaPost = new UrgenciaPediatrica();
        urgenciaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
        urgenciaPost.idArea = this.areaSeleccionada.idArea;
        urgenciaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
        urgenciaPost.idRubro = this.rubroSeleccionado.idRubro;
        urgenciaPost.cie10UrgenciaPediatrica = this.urgenciaPediatricaCie10;
        break;
    }
    
    
    urgenciaPost.noAplica = this.form.get('noAplica').value ? 1 : 0;

    this.spinner.hide();

    let id = null;

    switch(this.rubroSeleccionado.idRubro) {
      case this.rubros.URGENCIAS_MEDICAS_2DO_NIVEL:
        id = this.urgenciaMedica?.idUrgenciasMedicas;
        break;
      case this.rubros.URGENCIAS_GINE_2DO_NIVEL:
        id = this.urgenciaGinecologicas?.idUrgenciasGinecologicas;
        break;
      case this.rubros.URGENCIAS_OTRO_2DO_NIVEL:
        id = this.urgenciaOtras?.idOtrasUrgencias;
        break;
      case this.rubros.URGENCIAS_QUIRU_2DO_NIVEL:
        id = this.urgenciaQuirurgicas?.idUrgenciasQuirurgicas;
        break;
      case this.rubros.URGENCIAS_PEDIATRICOS:
        id = this.urgenciaPediatrica?.idUrgenciasPediatricas;
        break;
    }

    if(!id){
      // POST
      this.cuestionarioService.postCuestionarioEstatico(urgenciaPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });

    }else{
      // PUT
      

      switch(this.rubroSeleccionado.idRubro) {
        case this.rubros.URGENCIAS_MEDICAS_2DO_NIVEL:
          urgenciaPost.idUrgenciasMedicas = this.urgenciaMedica.idUrgenciasMedicas;
          break;
        case this.rubros.URGENCIAS_GINE_2DO_NIVEL:
          urgenciaPost.idUrgenciasGinecologicas = this.urgenciaGinecologicas.idUrgenciasGinecologicas;
          break;
        case this.rubros.URGENCIAS_OTRO_2DO_NIVEL:
          urgenciaPost.idOtrasUrgencias = this.urgenciaOtras.idOtrasUrgencias;
          break;
        case this.rubros.URGENCIAS_QUIRU_2DO_NIVEL:
          urgenciaPost.idUrgenciasQuirurgicas = this.urgenciaQuirurgicas.idUrgenciasQuirurgicas;
          break;
        case this.rubros.URGENCIAS_PEDIATRICOS:
          urgenciaPost.idUrgenciasPediatricas = this.urgenciaPediatrica.idUrgenciasPediatricas;
          break;
      }

      this.cuestionarioService.putCuestionarioEstatico(urgenciaPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }
  }


  cerrarCuestionario(){

    this.spinner.show();

    let rubroCuestiona: RubroCuestiona = new RubroCuestiona();

    rubroCuestiona.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    rubroCuestiona.idArea = this.areaSeleccionada.idArea;
    rubroCuestiona.idClues = this.autenticacionService.usuarioSesion.idClues;
    rubroCuestiona.idEstatus = EIC_ESTATUS.FINALIZADO;
    rubroCuestiona.idRubro = this.rubroSeleccionado.idRubro;

    this.cuestionarioService.postCerrarCuestionario(rubroCuestiona)
      .subscribe((response: any) => {
      this.spinner.hide();
      window.scroll(0,0);
      this.indCuestionarioCerrado = true;
      this.cierreRubro.emit(null);
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  public get rubros() : typeof RUBROS { return RUBROS;}

  get tipoAutocomplete(){ return TIPO_AUTOCOMPLETE;}

  get navegacion() { return NAVEGACION;}


}
