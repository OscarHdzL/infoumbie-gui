import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIC_ESTATUS, MENSAJES_ERROR, MENSAJES_NEGOCIO, TIPO_AUTOCOMPLETE } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Area } from 'src/app/shared/model/area/area';
import { DiagnosticoCIE } from 'src/app/shared/model/catalogos/DiagnosticoCIE';
import { DiagnosticoReferencia } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Referencias/DiagnosticosReferencia';
import { Referencias } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Referencias/Referencias';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';

@Component({
  selector: 'app-cuestionario-estatico-referencias',
  templateUrl: './cuestionario-estatico-referencias.component.html',
  styleUrls: ['./cuestionario-estatico-referencias.component.css']
})
export class CuestionarioEstaticoReferenciasComponent implements OnInit {

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

  public referencias: Referencias;
  public diagnosticosReferencia: DiagnosticoReferencia[];

  ngOnInit(): void {
    this.getCuestionario();
  }

  private getCuestionario() {
    this.spinner.show();
    this.cuestionarioService.getCuestionarioEstatico(this.areaSeleccionada.idArea, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
      this.spinner.hide();
      this.indCuestionarioCerrado = false;
      try {
        switch (response.status) {
          case 200:
            this.referencias = response.body;
            this.diagnosticosReferencia = this.referencias.diagnosticosReferencia;

            console.log("datos response->" + JSON.stringify(this.referencias));

            if( this.diagnosticosReferencia?.length  > 0  ) {
              this.form.controls['noAplica'].disable();
            }else {
              this.form.controls['noAplica'].enable();
            }
            break;
          case 204:
            break;
        }
      } finally {
        if(this.referencias?.idReferencia){
          this.updateFormGroup();
        }
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }


  public guardarCuestionario() {
    
    this.spinner.show();
    let referenciaPost: Referencias = new Referencias();
    referenciaPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    referenciaPost.envioReferencia = this.form.get('envioReferencia').value != null ? Number(this.form.get('envioReferencia').value) : null;
    referenciaPost.tiempoAtencionDia = this.form.get('tiempoAtencionDia').value;
    referenciaPost.idArea = this.areaSeleccionada.idArea;
    referenciaPost.idClues = this.autenticacionService.usuarioSesion.idClues;
    referenciaPost.idRubro = this.rubroSeleccionado.idRubro;
    referenciaPost.diagnosticosReferencia = this.diagnosticosReferencia;
    referenciaPost.noAplica = Number(this.form.get('noAplica').value);
    referenciaPost.noAplica = this.form.get('noAplica').value ? 1 : 0;

    this.spinner.hide();
    if(!this.referencias?.idReferencia){
      // POST
      this.cuestionarioService.postCuestionarioEstatico(referenciaPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });

    }else{
      // PUT
      referenciaPost.idReferencia = this.referencias.idReferencia;
      this.cuestionarioService.putCuestionarioEstatico(referenciaPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
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
    this.diagnosticosReferencia = [];
    diagnosticosList.forEach(element => {
      let diagnosticoCIE = new DiagnosticoReferencia();
      diagnosticoCIE.diagnostico = element.cie;
      diagnosticoCIE.idCie = element.idCie;
      diagnosticoCIE.refCie10 = element.refCie;
      this.diagnosticosReferencia.push(diagnosticoCIE);
    });

    this.guardarCuestionario();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      envioReferencia: [null, Validators.compose([Validators.required])],
      tiempoAtencionDia: [null, Validators.compose([Validators.required])],
      noAplica:[null] 
    });
  }

  private updateFormGroup(){
    this.form.get('envioReferencia').setValue(String(this.referencias.envioReferencia));
    this.form.get('tiempoAtencionDia').setValue(this.referencias.tiempoAtencionDia);
    this.form.get('noAplica').setValue(this.referencias.noAplica != 1  ? false : true );  
    this.updateValidators();
  }

  public keyPressOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
  
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private updateValidators() {
    for (const key in this.form.controls) {
      this.form.get(key).updateValueAndValidity();
    }
  }

  get navegacion() { return NAVEGACION;}

  get mensaje() { return MENSAJES_NEGOCIO; }

  get tipoAutocomplete(){ return TIPO_AUTOCOMPLETE;}

}
