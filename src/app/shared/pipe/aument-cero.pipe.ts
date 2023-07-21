import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aumentCero'
})
export class AumentCeroPipe implements PipeTransform {

  transform(value: any, args: string | null = null): string {
    const a: string = String(value)
    const zero = '0'
    if (a.length === 1) {
      const b = zero + a
      value = b
      return value;
    } else {
      return value;
    }
  }

}
