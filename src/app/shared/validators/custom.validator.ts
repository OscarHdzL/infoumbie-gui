import { AbstractControl } from '@angular/forms';

export class CustomValidator {

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value;
        const confirmPassword: string = control.get('confirmPassword').value;

        if (password != confirmPassword) {
            control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
    }

    static emailMatchValidator(control: AbstractControl) {
        const password: string = control.get('correo').value;
        const confirmPassword: string = control.get('correoConfirmacion').value;

        if (password != confirmPassword) {
            control.get('correoConfirmacion').setErrors({ noEmailMatch: true });
        }
    }

    static onlyNumber(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    static onlyLetrasEspacio(event: any) {
        const pattern = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }

    }

    static onlyLetras(event: any) {
        const pattern = /[a-zA-ZñÑáéíóúÁÉÍÓÚ]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }

    }

    static onlyFecha(event: any) {
        const pattern = /[0-9 :]/;
        const inputChar = String.fromCharCode(event.charCode);
      
        if (!pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

}