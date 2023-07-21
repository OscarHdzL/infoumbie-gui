import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tituloFormato'
})
export class TituloFormatoPipe implements PipeTransform {

  transform(cantidad: number): string | number {
    return cantidad > 0 ? cantidad : '';
  }

}
