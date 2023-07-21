import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DEFAULT_VALUE, MENSAJES_NEGOCIO } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
declare var PptxGenJS;

const perfilesSeguimiento = new Map([
    [8, 'GOBERNADORES'],
    [17, 'ADMINISTRADOR APLICACION'],
    [18, 'ADMINISTRADOR DE NEGOCIO'],
    [19, 'INTEGRADOR ESTATAL'],
    [20, 'INTEGRADOR DE MESA MEDICA'],
    [21, 'INTEGRADOR DE MESA CONSERVACIÓN'],
    [22, 'INTEGRADOR DE MESA SG'],
    [23, 'INTEGRADOR DE MESA EQUIPAMIENTO'],
    [24, 'INTEGRADOR DE MESA RH'],
    [25, 'INTEGRADOR DE MESA TECNOLOGIA'],
    [26, 'INTEGRADOR DE MESA JURIDICO'],
    [27, 'INTEGRADOR DE MESA ABASTO'],
    [28, 'INTEGRADOR DE MESA FINANZAS'],
    [29, 'SUPERVISOR'],
    [30, 'IMSS Bienestar'],
    [31, 'ESTATAL MÉDICA'],
    [32, 'INTEGRADOR DE MESA INFRAESTRUCTURA'],
    [61, 'Visualizar ubicación de unidades confirmadas'],
    [33, 'ENLACE ESTATAL GOBIERNO']
])

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChildren('pcaptcha')
  public captchaComponent: any;
  public captcha: boolean = false;
  public hide: boolean = true;

  public form: FormGroup;

  /* Indicador de versión actual del cliente */
  public versionDistinta: boolean = false;

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private autenticacionService: AutenticacionService, private router: Router,
    private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {
    this.autenticacionService.logout();
    this.createFormGroup();
  }

  // ngAfterViewInit() {
  //   this.captchaComponent.reset;
  // }

  public createFormGroup() {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
  }

  public mostrarPassword() {
    this.hide = !this.hide;
  }

  public autenticar() {

    if (this.form.invalid) return;

    this.spinner.show();

    this.autenticacionService.autenticacion(this.form.value.usuario.toUpperCase(), this.form.value.password)
      .subscribe((response: any) => {

        this.spinner.hide();
        switch (response.status) {
          case 400:
            this.modalDialogService.showDialog('Atención', "Error Autenticación", 'El usuario y/o la contraseña son incorrectas. Favor de verificar', () => { });
            return;
          case 401:
            this.modalDialogService.showDialog('Atención', "Error Autenticación", 'El usuario y/o la contraseña son incorrectas. Favor de verificar', () => { });
            return;
        }

        this.autenticacionService.guardarUsuario(response.access_token);
        this.autenticacionService.guardarToken(response.access_token);
        this.autenticacionService.guardarRefresh(response.refresh_token);

        if(parseInt(response.idPerfil) === 4  || parseInt(response.idPerfil) === 5){
          return this.router.navigate([NAVEGACION.adminEstadisticas]);
        }


        if(this.form.value.password == DEFAULT_VALUE.password){

          this.router.navigate([NAVEGACION.controlAccesoPrimeraVez]);

        

        }else if( parseInt(response.idPerfil) === 6){

          sessionStorage.setItem("idClues", response.idClues);
          sessionStorage.setItem("idModulo", "6");
          sessionStorage.setItem("refClue","");
          return this.router.navigate([NAVEGACION.home]);

        }else if( parseInt(response.idPerfil) === 7){
          
          return this.router.navigate([NAVEGACION.adminEstadisticas]);

        } else if (this.isSeguimientoPerfil(parseInt(response.idPerfil))){
            sessionStorage.setItem("idClues", response.idClues);
            sessionStorage.setItem("idModulo", response.idPerfil);
            sessionStorage.setItem("refClue","");
          return this.router.navigate([NAVEGACION.avance]);
        }
        else if (parseInt(response.idPerfil) === 13){
            sessionStorage.setItem("idClues", response.idClues);
            sessionStorage.setItem("idModulo", "13");
            sessionStorage.setItem("refClue","");
            return this.router.navigate([NAVEGACION.seleccion]);
        }
        else{

          return this.router.navigate([NAVEGACION.previo]);

        }

      }, err => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error Autenticación", 'El usuario y/o la contraseña son incorrectas. Favor de verificar', () => { });
      }
      );
  }

  public get formulario() {
    return this.form.controls;
  }

  get mensaje() { return MENSAJES_NEGOCIO; }

  public captchaResponse($event) {
    this.captcha = true;
  }

  public captchaExpired($event) {
    this.captcha = !$event;
  }

  public crear() {
      let pptx = new PptxGenJS();

      let slide = pptx.addSlide();
      slide.addImage({ path: "https://www.imss.gob.mx/sites/all/statics/imssdigital/banner_01.jpg", x:0, y:0, w:10, h:5.6 });
      slide.addText("Angular Demo!", { x: 0, y: 1, w: 10, fontSize: 36, fill: { color: 'F1F1F1' }, color:'FFFFFF', align: "center" });

      pptx.writeFile({ fileName: "angular-demo.pptx" });
  }

  public isSeguimientoPerfil(idPerfil: number): boolean {
      let perfilValido = perfilesSeguimiento.get(idPerfil);
      console.log('Perfil valido',  perfilValido);
      if (perfilValido)
          return true;
      return false;
  }

}
