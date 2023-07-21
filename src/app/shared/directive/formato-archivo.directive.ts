import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[formatos]'
})
export class FormatoArchivoDirective implements AfterViewInit{
  @Input() formatos: any[] = [];
  @Output() mostrarIconImg = new EventEmitter();
  private mostrar: boolean= false;

  constructor(
      private elRef: ElementRef
      ) {
      }

  ngAfterViewInit() {

    /*for(let i =0; i<=this.formatos.length; i++){
        if(this.formatos.nomArchivo.includes('jpg') ||
           this.formatos.nomArchivo.includes('jpeg') ||
           this.formatos.nomArchivo.includes('png')
        ){
            this.mostrar = true;
        }else{
            this.mostrar = false;
        }
    }
    this.mostrarIconImg.emit(this.mostrar);*/
 
  }

 
}