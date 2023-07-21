import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GLOBAL, MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { Area } from 'src/app/shared/model/area/area';
import { AreaService } from 'src/app/shared/services/area/area.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private areaService: AreaService,
    private spinner: NgxSpinnerService,
    private autenticacionService: AutenticacionService,
    private modalDialogService: ModalDialogService,
    private router: Router) {

      if( parseInt(this.autenticacionService.usuarioSesion.idPerfil) != 4  &&  !this.autenticacionService.usuarioSesion.cveMatricula ){
        this.router.navigate([NAVEGACION.login]);
      }

      this.bloqueo = sessionStorage.getItem('bloqueo') != null && sessionStorage.getItem('bloqueo') != undefined 
      ? parseInt(sessionStorage.getItem('bloqueo')) == 1 ? true : false : false;

    }

  public areas: Area[];
  bloqueo : boolean = false;


  home(){
    sessionStorage.removeItem("idClues");
    sessionStorage.removeItem("idModulo");
    sessionStorage.removeItem("refClue");
    sessionStorage.removeItem("bloqueo");
    this.router.navigate([NAVEGACION.admin]);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.areaService.getArea().subscribe((response: any) => {
      this.spinner.hide();
      switch (response.status) {
        case 200:

          this.areas = response.body;
          // console.log(this.areas);
          break;
        case 204:
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  get global() { return GLOBAL; }

  get seccion(): string {
    return sessionStorage.getItem("seccion");
  }


}
