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
import { MedicamentoCat } from 'src/app/shared/model/catalogos/MedicamentoCat';
import { Insumo } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Insumos/Insumos';
import { AltoCosto } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Insumos/InsumosMedicamentosAltoCosto';
import { CuatroBasico } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Insumos/InsumosMedicamentoCuatroBasico';

@Component({
  selector: 'app-cuestionario-estatico-insumos',
  templateUrl: './cuestionario-estatico-insumos.component.html',
  styleUrls: ['./cuestionario-estatico-insumos.component.css']
})
export class CuestionarioEstaticoInsumosComponent implements OnInit {

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

  public insumo: Insumo; 
  public listaAltoCosto: AltoCosto[]; 
  public listaCuatroBasico: CuatroBasico[]; 

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
            this.insumo = response.body;
            this.listaAltoCosto = this.insumo.listaAltoCosto;
            this.listaCuatroBasico = this.insumo.listaCuadroBasico;

            if( this.listaAltoCosto?.length  > 0  ) {
              this.form.controls['noAplicaAltoCosto'].disable();
            }else {
              this.form.controls['noAplicaAltoCosto'].enable();
            }

            if( this.listaCuatroBasico?.length  > 0  ) {
              this.form.controls['noAplicaCuatroBasico'].disable();
            }else {
              this.form.controls['noAplicaCuatroBasico'].enable();
            }

            break;
          case 204:
            break;
        }
      } finally {

        if(this.insumo?.idInsumo){
          this.updateFormGroup();
        }
       
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  public medicamentosList(medicamentosList: MedicamentoCat[]){

    this.listaCuatroBasico = [];
    medicamentosList.forEach(element => {
      let medicamento = new CuatroBasico();
      // medicamento.idListaMedicamento = element.idMedicamento;
      medicamento.idMedicamentoCatalogo = element.idMedicamento;
      medicamento.canPresenta = String(element.cantidad);
      medicamento.concentracion = element.concentracion;
      medicamento.forma = element.forma;
      medicamento.medicamento = element.generico;
      this.listaCuatroBasico.push(medicamento);
    });
    // console.log("Recibo medicamento: ",this.listaMedicamentos);
    this.guardarCuestionario();
  }

  public medicamentosListAltoCosto(medicamentosList: MedicamentoCat[]){

    this.listaAltoCosto = [];
    medicamentosList.forEach(element => {
      let medicamento = new AltoCosto();
      // medicamento.idListaMedicamento = element.idMedicamento;
      medicamento.idMedicamentoCatalogo = element.idMedicamento;
      medicamento.canPresenta = String(element.cantidad);
      medicamento.concentracion = element.concentracion;
      medicamento.forma = element.forma;
      medicamento.medicamento = element.generico;
      this.listaAltoCosto.push(medicamento);
    });
    // console.log("Recibo medicamento: ",this.listaMedicamentos);
    this.guardarCuestionario();
  }

  public guardarCuestionario() {

    this.spinner.show();
    let post: Insumo = new Insumo();
    post.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    post.medicamentosCuadroBasico = this.form.get('medicamentosCuadroBasico').value != null ? Number(this.form.get('medicamentosCuadroBasico').value) : null;
    post.faltaMedicamento = this.form.get('faltaMedicamento').value != null ? Number(this.form.get('faltaMedicamento').value) : null;
    post.abastoMedicamentoBasico = this.form.get('abastoMedicamentoBasico').value != null ? Number(this.form.get('abastoMedicamentoBasico').value) : null;
    post.solicitudEspecialBasico = this.form.get('solicitudEspecialBasico').value != null ? Number(this.form.get('solicitudEspecialBasico').value) : null;
    post.medicamentoAltoCosto = this.form.get('medicamentoAltoCosto').value != null ? Number(this.form.get('medicamentoAltoCosto').value) : null;
    post.faltaMedicamentoAltoCosto = this.form.get('faltaMedicamentoAltoCosto').value != null ?  Number(this.form.get('faltaMedicamentoAltoCosto').value) : null;
    post.abastoMedicamentoAltoCosto = this.form.get('abastoMedicamentoAltoCosto').value != null ? this.form.get('abastoMedicamentoAltoCosto').value : null;
    post.solicitudAltoCosto = this.form.get('solicitudAltoCosto').value != null ? this.form.get('solicitudAltoCosto').value : null;
    post.cuentaMaterialCuracion = this.form.get('cuentaMaterialCuracion').value != null ? this.form.get('cuentaMaterialCuracion').value : null;
    post.faltaMaterialCuracion = this.form.get('faltaMaterialCuracion').value != null ? this.form.get('faltaMaterialCuracion').value : null;
    post.materialCuracion = this.form.get('materialCuracion').value != null ? this.form.get('materialCuracion').value : null;
    post.abastoMaterialCuracion = this.form.get('abastoMaterialCuracion').value != null ? this.form.get('abastoMaterialCuracion').value : null;
    post.solicitudMaterailCuracion = this.form.get('solicitudMaterailCuracion').value != null ? this.form.get('solicitudMaterailCuracion').value : null;
    post.servicioGeneral =  this.form.get('servicioGeneral').value != null ? this.form.get('servicioGeneral').value : null;
    post.problemaLimpieza = this.form.get('problemaLimpieza').value != null ? this.form.get('problemaLimpieza').value : null;
    post.problemaInsumo = this.form.get('problemaInsumo').value != null ? this.form.get('problemaInsumo').value : null;
    post.problemaInsumoDes = this.form.get('problemaInsumoDes').value != null ? this.form.get('problemaInsumoDes').value : null;
    post.noAplicaAltoCosto = this.form.get('noAplicaAltoCosto').value ? 1 : 0;
    post.noAplicaCuatroBasico = this.form.get('noAplicaCuatroBasico').value ? 1 : 0;
    post.idArea = this.areaSeleccionada.idArea;
    post.idClues = this.autenticacionService.usuarioSesion.idClues;
    post.idRubro = this.rubroSeleccionado.idRubro;
    post.listaCuadroBasico = this.listaCuatroBasico;
    post.listaAltoCosto = this.listaAltoCosto;

    this.spinner.hide();
    if(!this.insumo?.idInsumo){
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
      post.idInsumo = this.insumo.idInsumo;
      this.cuestionarioService.putCuestionarioEstatico(post, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      medicamentosCuadroBasico: [null, Validators.compose([Validators.required])],
      faltaMedicamento: [null, Validators.compose([Validators.required])],
      abastoMedicamentoBasico: [null, Validators.compose([Validators.required])],
      solicitudEspecialBasico: [null, Validators.compose([Validators.required])],
      medicamentoAltoCosto: [null, Validators.compose([Validators.required])],
      faltaMedicamentoAltoCosto: [null, Validators.compose([Validators.required])],
      abastoMedicamentoAltoCosto: [null, Validators.compose([Validators.required])],
      solicitudAltoCosto: [null, Validators.compose([Validators.required])],
      cuentaMaterialCuracion: [null, Validators.compose([Validators.required])],
      faltaMaterialCuracion: [null, Validators.compose([Validators.required])],
      materialCuracion : [null, Validators.compose([Validators.required])],
      abastoMaterialCuracion: [null, Validators.compose([Validators.required])],
      solicitudMaterailCuracion: [null, Validators.compose([Validators.required])],
      servicioGeneral: [null, Validators.compose([Validators.required])],
      problemaLimpieza: [null, Validators.compose([Validators.required])],
      problemaInsumo: [null, Validators.compose([Validators.required])],
      problemaInsumoDes: [null, Validators.compose([Validators.required])],
      noAplicaCuatroBasico:[null] ,
      noAplicaAltoCosto:[null] 
    });
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


  private updateValidators() {
    for (const key in this.form.controls) {
      this.form.get(key).updateValueAndValidity();
    }
  }

  private updateFormGroup(){
    this.form.get('medicamentosCuadroBasico').setValue(String(this.insumo.medicamentosCuadroBasico));
    this.form.get('faltaMedicamento').setValue(String(this.insumo.faltaMedicamento));
    this.form.get('abastoMedicamentoBasico').setValue(String(this.insumo.abastoMedicamentoBasico));
    this.form.get('solicitudEspecialBasico').setValue(String(this.insumo.solicitudEspecialBasico));
    this.form.get('medicamentoAltoCosto').setValue(String(this.insumo.medicamentoAltoCosto));
    this.form.get('faltaMedicamentoAltoCosto').setValue(String(this.insumo.faltaMedicamentoAltoCosto));
    this.form.get('abastoMedicamentoAltoCosto').setValue(String(this.insumo.abastoMedicamentoAltoCosto));
    this.form.get('solicitudAltoCosto').setValue(String(this.insumo.solicitudAltoCosto));
    this.form.get('cuentaMaterialCuracion').setValue(String(this.insumo.cuentaMaterialCuracion));
    this.form.get('faltaMaterialCuracion').setValue(String(this.insumo.faltaMaterialCuracion));
    this.form.get('materialCuracion').setValue(this.insumo.materialCuracion == null ? "" : String(this.insumo.materialCuracion));
    this.form.get('abastoMaterialCuracion').setValue(String(this.insumo.abastoMaterialCuracion));
    this.form.get('solicitudMaterailCuracion').setValue(String(this.insumo.solicitudMaterailCuracion));
    this.form.get('servicioGeneral').setValue(String(this.insumo.servicioGeneral));
    this.form.get('problemaLimpieza').setValue(String(this.insumo.problemaLimpieza));
    this.form.get('problemaInsumo').setValue(String(this.insumo.problemaInsumo));
    this.form.get('problemaInsumoDes').setValue( this.insumo.problemaInsumoDes == null ? "" : String(this.insumo.problemaInsumoDes ));
    this.form.get('noAplicaCuatroBasico').setValue(this.insumo.noAplicaCuatroBasico != 1  ? false : true );
    this.form.get('noAplicaAltoCosto').setValue(this.insumo.noAplicaAltoCosto != 1  ? false : true );
    this.updateValidators();
  }


  get navegacion() { return NAVEGACION;}

  get mensaje() { return MENSAJES_NEGOCIO; }

  get tipoAutocomplete(){ return TIPO_AUTOCOMPLETE;}

}
