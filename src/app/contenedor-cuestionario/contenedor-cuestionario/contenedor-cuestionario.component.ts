import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { GLOBAL, MENSAJES_ERROR, TIPO_CUESTIONARIO } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Area } from 'src/app/shared/model/area/area';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { RubroService } from 'src/app/shared/services/rubro/rubro.service';

@Component({
  selector: 'app-contenedor-cuestionario',
  templateUrl: './contenedor-cuestionario.component.html',
  styleUrls: ['./contenedor-cuestionario.component.css']
})
export class ContenedorCuestionarioComponent implements OnInit {

  public areaSeleccionada: Area;
  public rubroSeleccionado: Rubro;
  public rubros : Rubro[];
  idItemSelecte: any;
  bloqueo : boolean = false;

  @ViewChild('carrusel') carrusel: any; 
  indexOpc: number;

  constructor(private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private rubroService: RubroService,
    private router: Router
    ) {

    this.bloqueo = sessionStorage.getItem('bloqueo') != null && sessionStorage.getItem('bloqueo') != undefined 
                                ? parseInt(sessionStorage.getItem('bloqueo')) == 1 ? true : false : false;

    try {
      if (this.router.getCurrentNavigation().extras.state.areaSeleccionada) {
        this.areaSeleccionada = this.router.getCurrentNavigation().extras.state.areaSeleccionada;
       
      } else {
        this.router.navigate([NAVEGACION.home]);
      }
    } catch (error) {
      this.router.navigate([NAVEGACION.home]);
      return;
    }

  }
 
  ngOnInit(): void {
    this.getRubrosPorArea();
  }

  /*ngAfterViewInit(){
    setTimeout(() => {
      console.log(this.carrusel);
      let opciones = this.carrusel.dotsData.dots; 
      for(let i = 0 ; i < opciones.length ; i++ ){
        opciones[i].active = false;
      }

    },2500);
   
  }*/
 
  capturarIndex(indice: number){
    /*this.rubro = datos.rubro;
    let opciones = document.getElementsByClassName("opcionRubro-"+datos.index);
    let divContenedor = document.getElementsByClassName("divOpcRubro");

    for(let i = 0 ; i < divContenedor.length ; i++ ){
      divContenedor[i].classList.remove('selectOpcionRubro');
    }

    for(let i = 0 ; i < opciones.length ; i++ ){
      opciones[i].classList.add('selectOpcionRubro');
    }*/
  
    //this.indexSelec = index;

    //obtenemos las opciones del paginado del carrusel
    let opciones = this.carrusel.dotsData.dots; 
    //obtenemos la opcion elegida del paginado del carrusel
    let opcionIndex = this.carrusel.dotsData.dots[indice]; 

    //recorremos todo el paginado del carrusel y los colocamos en false
    for(let i = 0 ; i < opciones.length ; i++ ){
      opciones[i].active = false;
    }

    //activamos la opcion elegida
    opcionIndex.active = true;

  }


  public cierreRubro(){
    this.getRubrosPorArea();
  }

  public cierreRubroEstatico(){
    this.getRubrosPorArea();
  }

  private getRubrosPorArea(){
    this.spinner.show();
    this.rubroService.getRubrosPorArea(this.areaSeleccionada.idArea).subscribe((response: any) => {
      this.spinner.hide();
      switch (response.status) {
        case 200:
          this.rubros = response.body;
          sessionStorage.setItem("rubros", JSON.stringify(this.rubros));
          // this.rubroService.setRubrosSesion(this.rubros);
          break;
        case 204:
          // this.rubroService.deleteRubrosSesion();
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  public getRubroSelected(rubro : Rubro){
    
    this.rubroSeleccionado = rubro;
    this.rubros.forEach(element => {
      if(element.idRubro == this.rubroSeleccionado.idRubro){
        element.indSelected = true;
      }else{
        element.indSelected = false;
      }
    });
  }

  public customOptions: OwlOptions = {
    
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dotsEach: true,
    navSpeed: 700,
    dots: true,
    dotsData: true,
    stagePadding: 0,
    autoWidth: false,
    nav: false,
    skip_validateItems: true,
    center: false,
    navText: ['<i class="glyphicon glyphicon-arrow-left"></i>', '<i class="glyphicon glyphicon-arrow-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      350: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
  }

  activeSlides : any ;

  getPassedData(data: SlidesOutputData) {

    let rubro = JSON.parse(sessionStorage.getItem('rubros'));
    this.activeSlides = data;
 
    //obtenemos el indice de la opcion del paginado para enviarlo al componente rubro
    this.indexOpc = this.activeSlides.startPosition;
    
    this.getRubroSelected(rubro[this.activeSlides.startPosition]);

    let nombre = data.slides[2].id;
    let temp = nombre.substr(nombre.length - 2);

    if(temp.includes('-')){
      let temp = nombre.substr(nombre.length - 1);
      this.idItemSelecte = temp;
    }else{
      this.idItemSelecte = temp;
    }

 

  }
  
  /*rubroSelect(rubro: Rubro, index: number){
    this.getRubroSelected(rubro);
    this.carrusel.slidesOutputData.startPosition = index;
    //this.carrusel.translated.EventEmitter( this.getPassedData(this.carrusel.slidesOutputData))
  }*/

  get global() { 
    return GLOBAL;
  }

  get navegacion() {
    return NAVEGACION;
  }

  get tipoCuestionario(){
    return TIPO_CUESTIONARIO;
  }

  get seccion(): string {
    return sessionStorage.getItem("seccion");
  }

  home(){
    sessionStorage.removeItem("idClues");
    sessionStorage.removeItem("idModulo");
    sessionStorage.removeItem("refClue");
    sessionStorage.removeItem("bloqueo");
    this.router.navigate([NAVEGACION.admin]);
  }


}
