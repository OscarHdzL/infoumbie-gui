import {FormGroup, ValidatorFn } from "@angular/forms";

export class CustomeDateValidators {
    static fechaFin(inputUno: string, inputDos: string): ValidatorFn {
        return (formGroup: FormGroup): any => {
            let valorInputUno = formGroup.controls[inputUno];
            let valorInputDos = formGroup.controls[inputDos];
            const fechaInicio = new Date(valorInputUno.value);
            const fechaFin = new Date(valorInputDos.value);

                //si fecha inicio no es nula pero la fecha fin si es nula se retorna un error
                if(valorInputUno.value !== null && valorInputDos.value === null){
                    return valorInputDos.setErrors({campoVacio: true});
                }

                //se valida que fecha inicio y fin tengan un valor 
                // y si fecha inicio es mayor a fin tire un error
                //if ((valorInputUno.value !== null && valorInputDos.value !== null) && fechaInicio.getTime() >= fechaFin.getTime()) {
                if ((valorInputUno.value !== null && valorInputDos.value !== null) && fechaInicio.getTime() > fechaFin.getTime()) {
                    return valorInputDos.setErrors({fechaMenor: true});
                }
                return valorInputDos.setErrors(null);
                
        };
    }
}