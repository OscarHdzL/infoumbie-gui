import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_NEGOCIO, DEFAULT_VALUE, GLOBAL } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CustomValidator } from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-control-primer-acceso',
  templateUrl: './control-primer-acceso.component.html',
  styleUrls: ['./control-primer-acceso.component.css']
})
export class ControlPrimerAccesoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private autenticacionService: AutenticacionService, private router: Router,
    private modalDialogService: ModalDialogService) { 
      if(this.autenticacionService.usuarioSesion.cveMatricula){
        this.router.navigate([NAVEGACION.login]);
      }
    }

  public form: FormGroup;
  public validarFormulario: boolean;
  public passNoCoincide: boolean;

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      primerApellido: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      segundoApellido: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50)])],
      matricula: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])]
    },
    {
      validator: CustomValidator.passwordMatchValidator
    });
  }

  public confirmar(){

    this.validarFormulario = true;
    this.passNoCoincide = false;

    if (this.form.invalid) {
      return;
    }
    
    if(this.form.value.password == DEFAULT_VALUE.password){
      this.modalDialogService.showDialog('Atención', "Error Autenticación", MENSAJES_NEGOCIO.contrasenaUserCoinciden, () => {});
      return;
    }

    this.spinner.show();

    this.form.value.segundoApellido = (this.form.value.segundoApellido != null && this.form.value.segundoApellido != undefined) ? this.form.value.segundoApellido : '';

    this.autenticacionService.cambiarContrasenaPrimerInicio(this.form.value.nombre, this.form.value.primerApellido, this.form.value.segundoApellido, this.form.value.matricula, this.form.value.password).subscribe(
      (response: any) => {
        switch (response.status) {
          case 200:
            this.spinner.hide();
            this.router.navigate([NAVEGACION.home]);
            break;
          default:
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error Autenticación", MENSAJES_NEGOCIO.cambioContrasenaError, () => {});
            break;
        }
      },
      err => {
        switch (err.status) {
          case 200:
              this.spinner.hide();
              this.router.navigate([NAVEGACION.home]);
            break;
          default:
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error Autenticación", MENSAJES_NEGOCIO.cambioContrasenaError, () => {});
            break;
        }
      }
    )
  }

  get mensaje() { return MENSAJES_NEGOCIO; }

  get global() { return GLOBAL; }

  get formulario() { return this.form.controls; }

}
