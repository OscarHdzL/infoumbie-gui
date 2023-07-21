import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public srcImagen: any;
  public contador: number;
  public totalArrayImages: number;
  public dataImages: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    //items del array
    this.dataImages = this.data.arrayImages;
    //Total de items del array
    this.totalArrayImages = this.data.arrayImages.length;
    //mostrar la imagen que se selecciono
    this.srcImagen = this.data.arrayImages[this.data.indexImgSeleccionada];
    //index de la imagen seleccionada
    this.contador = this.data.indexImgSeleccionada;
  }
  btnPrev(){
    this.contador--;
    if (this.contador < 0) { 
      //asignamos al contador la longitud del array, para que muestra la ultima imagen
      this.contador = this.totalArrayImages-1; 
    }
    this.showImagen(this.contador);
  }

  btnSig(){
    this.contador++;
    if (this.contador > this.totalArrayImages-1) {
      //se terminaron las imagenes 
      //entonces asignamos al contador la posicion 0 para que muestre la primer imagen
      this.contador = 0; 
    }
    this.showImagen(this.contador);
  }
  showImagen(n: number) {
    //le asignamos el nuevo valor de la imagen 
    this.srcImagen = this.dataImages[n] 
  }



}
