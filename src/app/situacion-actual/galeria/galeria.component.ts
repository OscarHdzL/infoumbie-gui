import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CarpetaAnio, DetalleMes, UrlImagen } from 'src/app/shared/model/situacion-actual/imagenes';
import { GaleriaService } from 'src/app/shared/services/situacion-actual/galeria.service';
import { CluesService } from 'src/app/shared/services/situacion-actual/clues.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  //public rutaUrlsImagenes:string = 'Nayarit/Segundo_Nivel/NTSSA000013_HOSPITAL_INTEGRAL_ACAPONETA';
  public arrayImagenes: any[] = [];
  public listaAnio: CarpetaAnio[] = [];
  public meses: DetalleMes [] = [];
  public loading: boolean = false;
  public loadingAnios: boolean = false;
  public numeroMes: number;
  public anioSeleccionado: string ='';

  public suscGetClueServ: Subscription;
  public rutaUrlsImagenes: string;
  
  constructor(
    private galeriaService: GaleriaService,
    private clueService: CluesService,
    public sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private modalDialogService: ModalDialogService,
  ) { }

  ngOnInit(): void {
    //this.getUrlImages(this.rutaUrlsImagenes, '2021');
    this.getMeses();
    this.getClue();
   //this.getCarpetasAnios(this.rutaUrlsImagenes);
  }

  getClue(){
    this.suscGetClueServ = this.clueService.getClues$()
    .subscribe(clue=>{
      this.loadingAnios = true;
      console.log("CLUE",clue);
      if(clue && clue.desUrlSharePoint){
        this.rutaUrlsImagenes = clue.desUrlSharePoint;
        console.log("ENTRO");
        this.getCarpetasAnios(clue.desUrlSharePoint);
      }else{
        console.log("NO ENTRO");
        //this.modalDialogService.showDialog('Atención', "Error", 'El campo desUrlSharepoint esta vacio', () => { });
        this.loadingAnios = false;
        this.listaAnio = [];
        this.arrayImagenes = [];
        this.getMeses();
      }

    });
   
  }

  getMeses(){
    this.meses = this.galeriaService.get_Meses();
  }

  anioSelect(event: any){
    this.arrayImagenes = [];
    this.numeroMes = 0;
    this.anioSeleccionado = event.target.value;
    let anio = event.target.value;
    this.galeriaService.getMeses(this.rutaUrlsImagenes,anio)
    .subscribe(resp=>{
      this.meses = resp;
    })
  
  }

  getCarpetasAnios(ruta: string){
    this.galeriaService.getCarpetasAnio(ruta)
    .pipe(
      tap(resp=>{
        this.listaAnio = resp;
        this.listaAnio.sort((a, b) =>  {
          let anio1 = + a.name;
          let anio2 = + b.name;
          return anio2-anio1;
        });
        this.loadingAnios = false;
      }),
      switchMap(resp => this.galeriaService.getMeses(this.rutaUrlsImagenes,this.listaAnio[0].name))
    )
    .subscribe(resp=>{
      this.anioSeleccionado = this.listaAnio[0].name;
      this.meses = resp;
      let mesesImg: DetalleMes[] = this.meses.filter(mes=> mes.files >0 );
      
      if(mesesImg){
        let detalleMes:DetalleMes = mesesImg[0];
        this.active(detalleMes.numero, detalleMes.nomApi);
      }
  
     /*let anioActual = resp.filter(elem => elem.name === anio.toString());
     console.log("ACTUAL", anioActual);*/
    },(err: any) => {
      this.loadingAnios = false;
      console.log("Error en el servicio getMeses", err);
    }
    )
  }
  /*getUrlImages(ruta: string,anio: string, mes: string){
    this.galeriaService.getUrlImagenes(ruta,anio,mes)
    .pipe(
      switchMap(urlImagen => this.galeriaService.getImagenes(urlImagen))
    )
    .subscribe(imagen =>{
      console.log("RESP IMG", imagen);
    })
  }*/
  
  getUrlImages(ruta: string,anio: string, mes: string){

    this.galeriaService.getUrlImagenes(ruta,anio,mes)
    
    .subscribe( urlImagenes => {

     urlImagenes.forEach(url => {

       console.log('URL IMAGEN', url);
      
        this.galeriaService.getImagenes(url.url)
        .subscribe(imagen=>{
          this.createImageFromBlob(imagen.body);
          this.loading = false;

        },(err: any) => {
          console.log("Ocurrio un error en el servicio de getImagenes", err);
        }
        )
     });
    },(err: any) => {
      console.log("Ocurrio un error en el servicio de getUrlsImagenes", err);
    }
    );
  }
   
  
  createImageFromBlob(image: Blob) {
    let objectURL = URL.createObjectURL(image);
    this.arrayImagenes.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
    /*let reader = new FileReader();
   
    reader.addEventListener("load", () => {
      this.arrayImagenes.push(reader.result);
  
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }*/
  
  }

  active(indexMes: number, mes: string) {
    /*if(indexMes === 0){
      this.loading = false;
      return;
    }*/
    this.loading = true;
    this.arrayImagenes = [];
    this.numeroMes = indexMes;
    this.getUrlImages(this.rutaUrlsImagenes,  this.anioSeleccionado, mes);  
  }

  mostrarModal(indexImg: number){
    let datos = {
      arrayImages: this.arrayImagenes,
      indexImgSeleccionada: indexImg
    };
    this.dialog.open(ModalComponent,{
      data: datos
    });
  }

  ngOnDestroy(): void{
    if(this.suscGetClueServ ){
      this.suscGetClueServ.unsubscribe();
    }
  }


}
