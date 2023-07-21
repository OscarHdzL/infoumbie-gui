import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoArchivo'
})
export class FormatoArchivoPipe implements PipeTransform {

  transform(value: string): boolean {
    let mostrarIcon: boolean = false;
    if(value.includes('jpg') || value.includes('jpeg') || value.includes('png')){
        mostrarIcon = true;
    }else{
        mostrarIcon = false;
    }
    return mostrarIcon;
  }

}
