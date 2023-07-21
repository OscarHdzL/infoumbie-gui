import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plecasImgAreaMedica'
})

export class PlecasImgAreaMedica implements PipeTransform {

    transform(tipoServicio: string): string {
      let tipo = tipoServicio.toLowerCase();
        switch(tipo){
            case 'consultorios':
            return `assets/images/pleca_consultorios.svg`;
            case 'generales':
            return `assets/images/pleca_generales.svg`;
            default:
              return `assets/images/pleca_default.svg`
        }
      }

}
