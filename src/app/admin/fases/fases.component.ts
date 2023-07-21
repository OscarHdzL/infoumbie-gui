import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { EstadisticasService } from 'src/app/shared/services/estadisticas/estadisticas.service';

@Component({
  selector: 'app-fases',
  templateUrl: './fases.component.html',
  styleUrls: ['./fases.component.css']
})
export class FasesComponent implements OnInit {


  clues: string = "";
  listaFases: [] = null;
  total : number = 0;
  page: number = 1;


  constructor(private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService, 
    private router: Router,
    private catalogoService: CatalogosService,
    private estadisticasService: EstadisticasService) {

      let data: any = this.router.getCurrentNavigation().extras.state;
      if(data != null && data.clues != null) {
        this.clues = data.clues;
      }else {
        this.router.navigate([NAVEGACION.admin]);
      }

    }

  ngOnInit(): void {
    this.getCuestionariosFasesTotales();
    this.getFases();
  }


  getFases() : void {
    this.spinner.show();
   
    this.estadisticasService.getPreguntasFases(this.clues,this.page).subscribe((response: any) => {

        this.spinner.hide();
        switch (response.status) {
          case 200:
            this.listaFases = response.body;
            break;
          case 204:
            this.listaFases = [];
            this.modalDialogService.showDialog('Atención', "Atención", "Sin respuestas en la Fase 1.", () => { });

            break;
        }

    }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  } 

  getCuestionariosFasesTotales(): void {
        
    this.spinner.show();
    this.spinner.show();

    this.estadisticasService.getPreguntasFasesTotal(this.clues).subscribe((response: any) => {

        switch (response.status) {
            case 200:
                  this.total = response.body.total;
                break;
            case 204:
                break;
        }

    }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
}

  pageChanged(page) {
    this.page = page;
    this.getFases();
  }

  get navegacion() {
    return NAVEGACION;
  }

}
