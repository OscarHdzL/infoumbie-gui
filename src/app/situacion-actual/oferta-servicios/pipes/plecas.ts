import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plecasImg'
})

export class PlecasImg implements PipeTransform {

    transform(tipoServicio: string): string {
    
      let tipo = tipoServicio.toLowerCase();
 
        switch(tipo){
            case 'consultorio':
            return `assets/images/pleca_consultorios.svg`;
            case 'generales':
            return `assets/images/pleca_generales.svg`;
            default:
              return `assets/images/pleca_default.svg`
        }
      }

}
