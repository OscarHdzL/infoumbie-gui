import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIC_ESTATUS, MENSAJES_ERROR, MENSAJES_NEGOCIO, TIPO_AUTOCOMPLETE } from 'src/app/shared/constants/global';
import { Area } from 'src/app/shared/model/area/area';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';
import { AtencionMedicaHospitalizacion } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/AtencionMedicaHospitalizacion/AtencionMedicaHospitalizacion';
import { AtencionMedicaCie10 } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/AtencionMedicaHospitalizacion/AtencionMedicaCie10';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { NAVEGACION } from 'src/app/shared/constants/navigation';

@Component({
  selector: 'app-cuestionario-estatico-hospitalizacion',
  templateUrl: './cuestionario-estatico-hospitalizacion.component.html',
  styleUrls: ['./cuestionario-estatico-hospitalizacion.component.css']
})
export class CuestionarioEstaticoHospitalizacionComponent implements OnInit {

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

  public atencionMedicaHospitalizacion: AtencionMedicaHospitalizacion;
  public atencionMedicaCie10: AtencionMedicaCie10[];

  ngOnInit(): void {
    this.getCuestionario();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      saturacion: [null, Validators.compose([Validators.required])],
      camasInsuficientes: [null, Validators.compose([Validators.required])],
      estaciasProlongadas: [null, Validators.compose([Validators.required])],
      reingreso: [null, Validators.compose([Validators.required])],
      ingresosHospitalarios: [null, Validators.compose([Validators.required])],
      porcentaje: [null, Validators.compose([Validators.required])],
      noAplica:[null] 
    });
  }

  private getCuestionario() {
    this.spinner.show();
    this.cuestionarioService.getCuestionarioEstatico(this.areaSeleccionada.idArea, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
      this.spinner.hide();
      this.indCuestionarioCerrado = false;
      try {
        switch (response.status) {
          case 200:     
            this.atencionMedicaHospitalizacion = response.body;
            this.atencionMedicaCie10 = this.atencionMedicaHospitalizacion.atencionMedicaHospitalizacionCie10;
            
            if( this.atencionMedicaCie10?.length  > 0  ) {
              this.form.controls['noAplica'].disable();
            }else {
              this.form.controls['noAplica'].enable();
            }

            break;
          case 204:
            break;
        }
      } finally {

        if(this.atencionMedicaHospitalizacion?.idAtencionMedicaHospitalizacion){
          this.updateFormGroup();
        }
       
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  public urgenciaListaCIE10(listaUrgenciasCie10: any[]){
    this.atencionMedicaCie10 = [];
    listaUrgenciasCie10.forEach(element => {
      let atencionMedicaCie = new AtencionMedicaCie10();
      atencionMedicaCie.idCie10 = element.idCie;
      atencionMedicaCie.refCie10 = element.refCie;
      atencionMedicaCie.atencionMedicaHospitalizacion = element.cie;
      this.atencionMedicaCie10.push(atencionMedicaCie);
    });
    this.guardarCuestionario();
  }    

  public guardarCuestionario() {

    this.spinner.show();
    let post: AtencionMedicaHospitalizacion = new AtencionMedicaHospitalizacion();
    post.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    post.saturacionServicio = this.form.get('saturacion').value != null ? Number(this.form.get('saturacion').value) : null;
    post.camaInsuficiente = this.form.get('camasInsuficientes').value != null ? Number(this.form.get('camasInsuficientes').value): null;
    post.estanciaProlongada = this.form.get('estaciasProlongadas').value != null ? Number(this.form.get('estaciasProlongadas').value): null;
    post.ingresoElevado = this.form.get('ingresosHospitalarios').value != null ? Number(this.form.get('ingresosHospitalarios').value) : null;
    post.porcentajeReingreso = this.form.get('porcentaje').value != null ? Number(this.form.get('porcentaje').value) : null;
    post.reingresoPaciente = this.form.get('reingreso').value != null ? this.form.get('reingreso').value : null;
    post.idArea = this.areaSeleccionada.idArea;
    post.idClues = this.autenticacionService.usuarioSesion.idClues;
    post.idRubro = this.rubroSeleccionado.idRubro;
    post.atencionMedicaHospitalizacionCie10 = this.atencionMedicaCie10;
    post.noAplica = this.form.get('noAplica').value ? 1 : 0;

    this.spinner.hide();
    if(!this.atencionMedicaHospitalizacion?.idAtencionMedicaHospitalizacion){
      // POST
      this.cuestionarioService.postCuestionarioEstatico(post, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });

    }else{
      // PUT
      post.idAtencionMedicaHospitalizacion = this.atencionMedicaHospitalizacion.idAtencionMedicaHospitalizacion;
      this.cuestionarioService.putCuestionarioEstatico(post, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
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

  private updateFormGroup(){
    this.form.get('saturacion').setValue(String(this.atencionMedicaHospitalizacion.saturacionServicio));
    this.form.get('camasInsuficientes').setValue(String(this.atencionMedicaHospitalizacion.camaInsuficiente));
    this.form.get('estaciasProlongadas').setValue(String(this.atencionMedicaHospitalizacion.estanciaProlongada));
    this.form.get('reingreso').setValue(String(this.atencionMedicaHospitalizacion.reingresoPaciente));
    this.form.get('ingresosHospitalarios').setValue(String(this.atencionMedicaHospitalizacion.ingresoElevado));
    this.form.get('porcentaje').setValue(String(this.atencionMedicaHospitalizacion.porcentajeReingreso));
    this.form.get('noAplica').setValue(this.atencionMedicaHospitalizacion.noAplica != 1  ? false : true );
    this.updateValidators();
  }

  get navegacion() { return NAVEGACION;}

  get mensaje() { return MENSAJES_NEGOCIO; }

  get tipoAutocomplete(){ return TIPO_AUTOCOMPLETE;}


}