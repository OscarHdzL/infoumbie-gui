import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIC_ESTATUS, MENSAJES_ERROR, MENSAJES_NEGOCIO, TIPO_AUTOCOMPLETE } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Area } from 'src/app/shared/model/area/area';
import { MedicamentoCat } from 'src/app/shared/model/catalogos/MedicamentoCat';
import { ListaMedicamentos } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Medicamentos/ListaMedicamentos';
import { Medicamentos } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Medicamentos/Medicamentos';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';

@Component({
  selector: 'app-cuestionario-estatico-medicamentos',
  templateUrl: './cuestionario-estatico-medicamentos.component.html',
  styleUrls: ['./cuestionario-estatico-medicamentos.component.css']
})
export class CuestionarioEstaticoMedicamentosComponent implements OnInit {

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
  public medicamentos: Medicamentos; 
  public listaMedicamentos: ListaMedicamentos[]; 

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
            this.medicamentos = response.body;
            this.listaMedicamentos = this.medicamentos.listaMedicamento;
            if( this.listaMedicamentos?.length  > 0  ) {
              this.form.controls['noAplica'].disable();
            }else {
              this.form.controls['noAplica'].enable();
            }
            break;
          case 204:
            break;
        }
      } finally {
        if(this.medicamentos?.idMedicamento){
          this.updateFormGroup();
        }
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    }, );
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      canCuadroBasico: [null, Validators.compose([Validators.required])],
      noAplica:[null] 
    });
  }

  private updateFormGroup(){
    this.form.get('canCuadroBasico').setValue(String(this.medicamentos.canCuadroBasico));
    this.form.get('noAplica').setValue(this.medicamentos.noAplica != 1  ? false : true );
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

  public medicamentosList(medicamentosList: MedicamentoCat[]){
    this.listaMedicamentos = [];
    medicamentosList.forEach(element => {
      let medicamento = new ListaMedicamentos();
      // medicamento.idListaMedicamento = element.idMedicamento;
      medicamento.idMedicamentoCatalogo = element.idMedicamento;
      medicamento.canPresenta = String(element.cantidad);
      medicamento.concentracion = element.concentracion;
      medicamento.forma = element.forma;
      medicamento.medicamento = element.generico;
      this.listaMedicamentos.push(medicamento);
    });
    // console.log("Recibo medicamento: ",this.listaMedicamentos);
    this.guardarCuestionario();
  }

  public guardarCuestionario() {

    this.spinner.show();

    let medicamentosPost: Medicamentos = new Medicamentos();
    medicamentosPost.canCuadroBasico = this.form.get('canCuadroBasico').value != null ? Number(this.form.get('canCuadroBasico').value) : null;
    medicamentosPost.idArea = this.areaSeleccionada.idArea;
    medicamentosPost.idClues = this.autenticacionService.usuarioSesion.idClues;
    medicamentosPost.idRubro = this.rubroSeleccionado.idRubro;
    medicamentosPost.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    medicamentosPost.listaMedicamento = this.listaMedicamentos;
    medicamentosPost.noAplica = this.form.get('noAplica').value ? 1 : 0;

    if(!this.medicamentos?.idMedicamento){
      // POST
      this.cuestionarioService.postCuestionarioEstatico(medicamentosPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
        this.spinner.hide();
        this.getCuestionario();
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }else{
      // PUT
      medicamentosPost.idMedicamento = this.medicamentos.idMedicamento;
      this.cuestionarioService.putCuestionarioEstatico(medicamentosPost, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
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

  get navegacion() { return NAVEGACION;}

  get mensaje() { return MENSAJES_NEGOCIO; }

  get tipoAutocomplete(){ return TIPO_AUTOCOMPLETE;}
}
