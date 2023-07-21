import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-parrafo-alertas',
  templateUrl: './parrafo-alertas.component.html',
  styleUrls: ['./parrafo-alertas.component.css']
})
export class ParrafoAlertasComponent implements OnInit {

  public textoOriginal: string;

  @Input() public texto: string;
  @Input() public completo: boolean;
  public mostrarCompleto: boolean;
  public mostrarColapsable: boolean = true;
  constructor() { }

  ngOnInit(): void {
    

  }

  ngOnChanges(changes:SimpleChanges): void{
   
    //console.log("COMPLETO"+ changes.completo.currentValue);
   
    //Si la variable completo es true no se acorta el parrafo
    if(changes.completo && changes.completo.currentValue){
      return;
    }else{
   
      if(changes.texto && changes.texto.currentValue !== null){
        this.textoOriginal = changes.texto.currentValue.replace(/^(.{200}[^\s]*).*/, "$1");
        if(changes.texto.currentValue.length >= 200){
          this.mostrarColapsable = true;
        }else{
          this.mostrarColapsable = false;
        }
      }
      
    }

   
   }
}
