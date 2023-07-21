import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Clue, EntidadFederativa } from 'src/app/shared/model/catalogos/EntidadFederativa';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';

@Component({
  selector: 'app-previo',
  templateUrl: './previo.component.html',
  styleUrls: ['./previo.component.css']
})
export class PrevioComponent implements OnInit {

  listaEntidades: EntidadFederativa[] = [];
  listaClues: Clue[] = [];
  entidad : any = 0;
  clue : any = 0;

  constructor(private catalogoService:CatalogosService
    , private spinner: NgxSpinnerService
    , private modalDialogService: ModalDialogService 
    , private router:Router) { }

  ngOnInit(): void {
    this.llenarComboEntidades();
  }

  llenarComboEntidades() : void{
        this.spinner.show();
        this.catalogoService.getEntidadesFederativas(null,null).subscribe((response: any) => {
            this.spinner.hide();
            switch (response.status) {
              case 200:
                this.listaEntidades = response.body.filter(res => res.numero > 0); ;
                break;
              case 204:
                this.listaEntidades = [];
                break;
            }
      
        }, (err: any) => {
            this.spinner.hide();
            this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
        });
    }


    llenarComboCles(){
      this.clue = 0;
      this.spinner.show();
      this.catalogoService.getClues(this.entidad).subscribe((response: any) => {
          this.spinner.hide();
          switch (response.status) {
            case 200:
              this.listaClues = response.body;
              break;
            case 204:
              this.listaClues = [];
              break;
          }
    
      }, (err: any) => {
          this.spinner.hide();
          this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }

    irHome(){      
      sessionStorage.setItem("idClues",this.clue.clave);
      sessionStorage.setItem("idModulo",this.clue.modulo);
      sessionStorage.setItem("refClue",this.clue.referencia);
      this.router.navigate([NAVEGACION.home]);
    }
  }

