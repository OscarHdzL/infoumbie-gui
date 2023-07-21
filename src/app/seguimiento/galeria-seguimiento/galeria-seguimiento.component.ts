import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-galeria-seguimiento',
  templateUrl: './galeria-seguimiento.component.html',
  styleUrls: ['./galeria-seguimiento.component.css']
})
export class GaleriaSeguimientoComponent implements OnInit {

  public totalArrayImages: number;
  public srcImagen: Object = '';
  public nomImagen: string = '';
  private contador: number = 0;
  public imagenes: any [] = [];
  public indexImgSeleccionada = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<GaleriaSeguimientoComponent>
  ) { }

  ngOnInit(): void {
    //console.log("DATA IMGS", this.data);
    
    if(this.data.imagenes){
      this.totalArrayImages = this.data.imagenes.length;
      this.createImageFromBlob(this.data.imagenes);
  
      if(this.data.nomImgSeleccionada && this.data.nomImgSeleccionada!==null){
        this.buscarImagenPorNombre(this.data.nomImgSeleccionada);
      }else{
        this.showImagen(0);
      }
    }
   
  }

  private createImageFromBlob(imagenes: any): void{
    if(imagenes.length ===0){
      return;
    }
    imagenes.forEach(element => {
      var fileURL = URL.createObjectURL(element.base64);
    
      let data = {
        urlImagen: this.sanitizer.bypassSecurityTrustUrl(fileURL),
        nomImagen: element.nomFile,
        nomImagenSinExtension: this.deleteExtensionImg(element.nomFile)
      }

      this.imagenes.push(data);
     });
  }

  private deleteExtensionImg(nomImg: string): string{
    let indiceCadena = nomImg.indexOf(".");
    return nomImg.substring(0, indiceCadena);
  }

  private buscarImagenPorNombre(nomImgSeleccionada: string): void{
    
    this.imagenes.forEach((element, index, array) => {
     
      if(element.nomImagen === nomImgSeleccionada){
        this.showImagen(index);
      }
     
    })
  }
 
  public btnPrev(): void{
    this.contador--;
    //console.log("contador menos", this.contador);
    if (this.contador < 0) { 
      //asignamos al contador la longitud del array, para que muestra la ultima imagen
      this.contador = this.totalArrayImages-1; 
    }

    this.showImagen(this.contador);
  }

  public btnSig(): void{
    this.contador++;
    //console.log("contador mas", this.contador);
    if (this.contador > this.totalArrayImages-1) {
      //se terminaron las imagenes 
      //entonces asignamos al contador la posicion 0 para que muestre la primer imagen
      this.contador = 0; 
    }
    this.showImagen(this.contador);
  }

  private showImagen(n: number): void {
    //le asignamos el nuevo valor de la imagen 
    this.indexImgSeleccionada = n;
    this.srcImagen = this.imagenes[n]?.urlImagen;
    this.nomImagen = this.imagenes[n]?.nomImagenSinExtension;
  }

  public btnImagen(indiceImg: number){
    this.showImagen(indiceImg);
  }

}
