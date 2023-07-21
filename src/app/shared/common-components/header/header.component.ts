import { Component, OnInit, Input } from '@angular/core';
import { HeaderMenu } from '../../model/header/header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  urlBase : string;
  mainMenu : HeaderMenu[];
  conoceMenu : HeaderMenu[];
  directorioMenu : HeaderMenu[];
  transparenciaMenu : HeaderMenu[];

  constructor(
    // private autenticacionService: AutenticacionService, public router: Router, public location: Location
    ) { 
    this.urlBase = "http://www.imss.gob.mx";
    this.mainMenu = new Array();
    this.conoceMenu = new Array();
    this.directorioMenu = new Array();
    this.transparenciaMenu = new Array();
    this.mainMenu.push({title: "Inicio", link: this.urlBase, subMenu: null});
    this.mainMenu.push({title: "Conoce al IMSS", link: this.urlBase + "/conoce-al-imss"});
    this.mainMenu.push({title: "Transparencia", link: this.urlBase + "/transparencia"});
    this.mainMenu.push({title: "Directorio", link: this.urlBase + "/directorio"});
    this.mainMenu.push({title: "Contacto ciudadano", link: this.urlBase + "/contacto", subMenu: null});
    this.conoceMenu.push({title: "Acerca del IMSS", link: this.urlBase + "/conoce-al-imss", subMenu: null});
    this.conoceMenu.push({title: "Sala de Prensa", link: this.urlBase + "/prensa", subMenu: null});
    this.conoceMenu.push({title: "Datos abiertos IMSS", link: "http://datos.imss.gob.mx/", subMenu: null});
    this.conoceMenu.push({title: "Trámites y servicios", link: this.urlBase + "/tramites", subMenu: null});
    this.directorioMenu.push({title: "Directorio de instalaciones", link: this.urlBase + "/directorio", subMenu: null});
    this.directorioMenu.push({title: "Directorio de funcionarios", link: "https://consultapublicamx.inai.org.mx/vut-web/?idSujetoObigadoParametro=180&idEntidadParametro=33&idSectorParametro=21", subMenu: null});
    this.transparenciaMenu.push({title: "IMSS Transparente", link: this.urlBase + "/transparencia", subMenu: null});
    this.transparenciaMenu.push({title: "Normatividad", link: this.urlBase + "/transparencia/normatividad-fp", subMenu: null});
    this.transparenciaMenu.push({title: "Acceso a la información", link: this.urlBase + "/transparencia/comite-informacion-fp", subMenu: null});
    this.transparenciaMenu.push({title: "Indicadores", link: this.urlBase + "/transparencia/indicadores-estudios", subMenu: null});
    this.transparenciaMenu.push({title: "Recomendaciones y Resoluciones por Disposición", link: this.urlBase + "/transparencia/recomendaciones-fp", subMenu: null});
    this.transparenciaMenu.push({title: "Estudios financiados", link: this.urlBase + "/sites/all/statics/pdf/transparencia/FP-EstudiosOpiniones.pdf", subMenu: null});
    this.transparenciaMenu.push({title: "Programas e informes", link: this.urlBase + "/transparencia/rendicion-cuentas-fp", subMenu: null});
    this.transparenciaMenu.push({title: "Normatividad en transparencia", link: this.urlBase + "/transparencia/normatividad-fp", subMenu: null});
    this.mainMenu[1].subMenu = this.conoceMenu;
    this.mainMenu[2].subMenu = this.transparenciaMenu;
    this.mainMenu[3].subMenu = this.directorioMenu;
  }

  ngOnInit() { }

  // salir() {
  //   this.autenticacionService.logout();
  // }

  // get navegacion() {
  //   return NAVEGACION;
  // }

  // get appName() {
  //   return GLOBAL.appNombre;
  // }

  // get usuarioSesion(): UsuarioSesion {
  //   return this.autenticacionService.usuarioSesion;
  // }

  // public get rol(): typeof ROLES {
  //   return ROLES;
  // }

  // redirectTo(uri: string) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  //     this.router.navigate([uri]));
  // }

}
