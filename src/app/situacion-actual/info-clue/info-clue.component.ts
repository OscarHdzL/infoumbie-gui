import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/shared/model/situacion-actual/hospital';
import { Observacion } from 'src/app/shared/model/situacion-actual/Observacion';
import { CluesService } from 'src/app/shared/services/situacion-actual/clues.service';
import { HospitalService } from 'src/app/shared/services/situacion-actual/hospital.service';

@Component({
  selector: 'app-info-clue',
  templateUrl: './info-clue.component.html',
  styleUrls: ['./info-clue.component.css']
})
export class InfoClueComponent implements OnInit, OnDestroy {
  public slide: number = 0;
  public slideModal: number = 0;
  public slides: any;
  public slidesModal: any;
  public total: number;
  public totalModal: number;

  public imageBlobUrl;
  public imageBlobUrlModal;

  public listaObservaciones: Observacion[] = [];
  public hospImgSuscriptor: Subscription;
  public hospUrlsImgSuscriptor: Subscription;
  public hospInfoSuscriptor: Subscription;
  
  public listaUrlImagenes: string[] = [];
  public infoHospital: Hospital = new Hospital();
  public loading: boolean;
  public loadingModal: boolean;
  public rutaUrlsImagenes:string = 'Nayarit/Segundo_Nivel/NTSSA000013_HOSPITAL_INTEGRAL_ACAPONETA';
  public listaNotas: string[] = [];
  public listaAcciones: string[] = [];
  public listaResidentes: string[] = [];
  public totalInfoHospital: Hospital[] = [];
  public suscClueServ: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private hospitalService: HospitalService,
    private clueService: CluesService
  ) { }

  ngOnInit(): void {
    this.suscClueServ = this.clueService.getClues$()
    .subscribe(clue => {

      if(clue){
        this.totalInfoHospital = [];
        this.listaAcciones = []
        this.listaNotas = [];
        this.listaResidentes = [];
        this.loading = true;
        this.informacionHospital(clue.refClues);
      }else{
        this.totalInfoHospital = [];
        this.infoHospital = new Hospital();
        this.listaAcciones = []
        this.listaNotas = [];
        this.listaResidentes = [];
        this.loading = false;
      }
     
    },(err: any) => {
      this.loading = false;
      console.log("Error en el servcio clueService para obtener la refClue", err);
    }
    )
  }

  informacionHospital(refClue: string){
    this.hospInfoSuscriptor = this.hospitalService.getInfoHospital(refClue)
    .subscribe(infoHospital => {
      console.log("INFO", infoHospital);
      this.totalInfoHospital = infoHospital;

      if(this.totalInfoHospital.length > 0){
        this.infoHospital.nomHospital = infoHospital[0].nomHospital;
        this.infoHospital.notas = infoHospital[0].notas;
        this.infoHospital.residentes = infoHospital[0].residentes;
        this.infoHospital.acciones = infoHospital[0].acciones;

      this.listaNotas = (this.infoHospital.notas !== '') 
      ? this.infoHospital.notas.replace(/[\n]/g,"").trim().split('•')
      : [];

      this.listaAcciones = (this.infoHospital.acciones !== '')
      ? this.infoHospital.acciones.replace(/[\n]/g,"").trim().split('•')
      :[];

      this.listaResidentes = (this.infoHospital.residentes !== '') 
      ? this.infoHospital.residentes.replace(/[•\t]/g,"").trim().split('\n')
      : [];

      }else{
        this.totalInfoHospital = [];
        this.listaAcciones = []
        this.listaNotas = [];
        this.listaResidentes = [];
      }
      this.loading = false;
    
    },(err: any) => {
      this.loading = false;
      console.log("Error en el servicio getInfoHospital", err);
    }
    );
  }

  getUrlImages(ruta: string, carpeta: string){
    this.loading = true;
    this.hospUrlsImgSuscriptor = this.hospitalService.getUrlImagenes(ruta,carpeta)
    .subscribe( (urlImagenes: any) => {
     this.listaUrlImagenes = urlImagenes.value;
     if(this.listaUrlImagenes.length > 0){
      this.getImage(0,1);
     }else{
      this.loading = false;
     }
    });
  }

  getImage(index: number, opc:number){
    
    this.hospImgSuscriptor = this.hospitalService.getImagenes(this.listaUrlImagenes[index]['@microsoft.graph.downloadUrl']!).
    subscribe((imagen:any) => {
      console.log("IMAGEN",imagen);
      this.createImageFromBlob(imagen.body, opc);
    })
  }


  createImageFromBlob(image: Blob, opc:number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if(opc==1){
        this.imageBlobUrl = reader.result;
        this.loading = false;
      }else{
        this.imageBlobUrlModal = reader.result;
        this.loadingModal = false;
      }
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

 
  /*ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }*/
  /*ngAfterViewInit() {
   
    this.slides = document.querySelectorAll(".slider ul li");
    this.slidesModal = document.querySelectorAll(".slider-modal ul li");

    this.total = this.slides?.length;
    this.totalModal = this.slidesModal?.length;

    // show first side
    this.showSlide(this.slide);
    this.showSlideModal(this.slideModal);
  }*/

  siguiente(event: any) {
    this.loading = true;
    this.slide++;
    console.log(this.slide);
   /* if (this.slide > this.total) { this.slide = 1; }
    this.showSlide(this.slide);*/
    if (this.slide > this.listaUrlImagenes.length-1) { this.slide = 0; }
    this.getImage(this.slide,1);
  }

  atras(event: any) {
    this.loading = true;
    this.slide--;
   /* if (this.slide > this.listaImagenes.length-1) { this.slide = 0; }
    this.getImage(this.slide);*/
    if (this.slide < 1) { this.slide = this.listaUrlImagenes.length-1; }
    this.getImage(this.slide,1);
  }


  siguienteModal(event: any) {
    this.loadingModal = true;
    this.slideModal++;
    if (this.slideModal > this.listaUrlImagenes.length-1) { this.slideModal = this.listaUrlImagenes.length-1; }
    this.getImage(this.slideModal,2);

  }

  atrasModal(event: any) {
    this.loadingModal = true;
    this.slideModal--;
    if (this.slideModal < 1) { this.slideModal = 0; }
    this.getImage(this.slideModal,2);
  }

  /*showSlide(n: number) {
    n--; // decrement 1
    for (let i = 0; i < this.slides.length; i++) {
      (i == n) ? this.slides[n].style.display = "block" : this.slides[i].style.display = "none";
    }
  }*/

  /*showSlideModal(n: number) {
    n--; // decrement 1
    for (let i = 0; i < this.slidesModal.length; i++) {
      (i == n) ? this.slidesModal[n].style.display = "block" : this.slidesModal[i].style.display = "none";
    }
  }*/
  zoom(){
    this.loadingModal = true;
    this.getImage(this.slideModal,2);
  }

  ngOnDestroy(): void{
    if(this.suscClueServ){
      this.suscClueServ.unsubscribe();
    }
   // (this.hospInfoSuscriptor == null || '' ? this.hospInfoSuscriptor : this.hospInfoSuscriptor.unsubscribe());
   // (this.hospImgSuscriptor == null || '' ? this.hospImgSuscriptor: this.hospImgSuscriptor.unsubscribe());
   // (this.hospUrlsImgSuscriptor == null || '' ? this.hospUrlsImgSuscriptor: this.hospUrlsImgSuscriptor.unsubscribe());
  }

  buttonChange(event: any){
    this.getUrlImages(this.rutaUrlsImagenes, event.value);
  }
}
