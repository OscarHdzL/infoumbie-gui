import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIC_ESTATUS, MENSAJES_ERROR, MENSAJES_NEGOCIO, TIPO_AUTOCOMPLETE } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Area } from 'src/app/shared/model/area/area';
import { DiagnosticoCIE } from 'src/app/shared/model/catalogos/DiagnosticoCIE';
import { DiagnosticoAtencion } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/AtencionMedica/DiagnosticoAtencion';
import { AtencionMedica } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/AtencionMedica/AtencionMedica';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';
import { MedicamentoCat } from 'src/app/shared/model/catalogos/MedicamentoCat';

@Component({
  selector: 'app-cuestionario-estatico-atencion-medica',
  templateUrl: './cuestionario-estatico-atencion-medica.component.html',
  styleUrls: ['./cuestionario-estatico-atencion-medica.component.css']
})
export class CuestionarioEstaticoAtencionMedicaComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService, 
    private cuestionarioService: CuestionarioService,
    private autenticacionService: AutenticacionService) {
      this.createFormGroup();
  }

  @Input() rubroSeleccionado: Rubro;
  @Input() areaSeleccionada: Area;
  @Output() cierreRubro  = new EventEmitter<any>(); 
  
  public form: FormGroup;
  public indCuestionarioCerrado: boolean = false;
  public atencionMedica: AtencionMedica;
  public diagnosticoAtencion: DiagnosticoAtencion[];

  ngOnInit(): void {   
    this.getCuestionario();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      poblacion: [null, Validators.compose([Validators.required])],
      distanciaMinima: [null, Validators.compose([Validators.required])],
      distanciaMaxima: [null, Validators.compose([Validators.required])],
      noAplica:[null] 
    });
  }

  private updateFormGroup(){
    this.form.get('poblacion').setValue(String(this.atencionMedica.poblacion));
    this.form.get('distanciaMaxima').setValue(this.atencionMedica.distanciaMaxima);
    this.form.get('distanciaMinima').setValue(this.atencionMedica.distanciaMinima);    
    this.form.get('noAplica').setValue(this.atencionMedica.noAplica != 1  ? false : true ); 
    this.updateValidators();
  }

  private updateValidators() {
    for (const key in this.form.controls) {
      this.form.get(key).updateValueAndValidity();
    }
  }

  public keyPressOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
  
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  public guardarCuestionario() {

    this.spinner.show();

    let atencionMedicaPost: AtencionMedica = new AtencionMedica();
    atencionMedicaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    atencionMedicaPost.poblacion = this.form.get('poblacion').value != null ? Number(this.form.get('poblacion').value) : null;
    atencionMedicaPost.distanciaMinima = this.form.get('distanciaMinima').value != null ? Number(this.form.get('distanciaMinima').value) : null;
    atencionMedicaPost.distanciaMaxima = this.form.get('distanciaMaxima').value != null ? Number(this.form.get('distanciaMaxima').value) : null;
    atencionMedicaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
    atencionMedicaPost.idRubro = this.rubroSeleccionado.idRubro;
    atencionMedicaPost.diagnosticoAtencion = this.diagnosticoAtencion;
    atencionMedicaPost.noAplica = this.form.get('noAplica').value ? 1 : 0;


    if(!this.atencionMedica?.idAtencionMedica){
      // POST
      this.cuestionarioService.postCuestionarioEstatico(atencionMedicaPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }else{
      // PUT
      atencionMedicaPost.idAtencionMedica = this.atencionMedica.idAtencionMedica;
      this.cuestionarioService.putCuestionarioEstatico(atencionMedicaPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
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

  public diagnosticosList(diagnosticosList: DiagnosticoCIE[]){
    this.diagnosticoAtencion = [];
    diagnosticosList.forEach(element => {
      let diagnosticoCIE = new DiagnosticoAtencion();
      diagnosticoCIE.diagnostico = element.cie;
      diagnosticoCIE.idCie = element.idCie;
      diagnosticoCIE.refCie10 = element.refCie;
      this.diagnosticoAtencion.push(diagnosticoCIE);
    });

    this.guardarCuestionario();
  }

  private getCuestionario() {
    this.spinner.show();
    this.cuestionarioService.getCuestionarioEstatico(this.areaSeleccionada.idArea, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
      this.spinner.hide();
      this.indCuestionarioCerrado = false;
      try {
        switch (response.status) {
          case 200:            
            this.atencionMedica = response.body;            
            this.diagnosticoAtencion = this.atencionMedica.diagnosticoAtencion;
            if( this.diagnosticoAtencion?.length  > 0  ) {
              this.form.controls['noAplica'].disable();
            }else {
              this.form.controls['noAplica'].enable();
            }
            break;
          case 204:
            break;
        }
      } finally {
        if(this.atencionMedica?.idAtencionMedica){
          this.updateFormGroup();
        }
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  get navegacion() { return NAVEGACION;}

  get mensaje() { return MENSAJES_NEGOCIO; }

  get tipoAutocomplete(){ return TIPO_AUTOCOMPLETE;}

}
