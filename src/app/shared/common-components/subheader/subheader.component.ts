import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { NAVEGACION } from '../../constants/navigation';
import { UsuarioSesion } from '../../model/session/usuarioSesion';
import { CatalogosService } from '../../services/catalogos/catalogos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  public urlBase = "http://www.imss.gob.mx";
  refClue : string = '';
  idPerfil: number = 0;
  listaDatos : any[] = [];
  descripciones: any[] = [];

  @Input()
  public titulo = 'Cuestionario';

  constructor(
    private autenticacionService: AutenticacionService, 
    public router: Router,
    public catalogosService: CatalogosService,
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {
    this.refClue = sessionStorage.getItem("refClue");
    this.idPerfil = parseInt(this.autenticacionService.usuarioSesion.idPerfil);

  }

  public salir() {
    this.autenticacionService.logout();
    return this.router.navigate([NAVEGACION.login]);
  }

  get usuarioSesion(): UsuarioSesion {
    return this.autenticacionService.usuarioSesion;
  }

  generalExcel(){
    this.spinner.show();
    this.spinner.show();
    this.catalogosService.getPreguntasRespuestas().subscribe((response: any) => {
      this.spinner.hide();
      this.listaDatos = response.body.preguntasRespuestas;
      this.descripciones = response.body.descripciones;
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    },() => {

      setTimeout(() => {
        this.exportexcelPreguntasContestadas();
      }, 2000);
      
    });
  }

  exportexcelPreguntasContestadas(): void {
    /* table id is passed over here */   
    let element = document.getElementById('tabla_cuestionario_cuestionarios'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element, {raw:true});
    this.wrapAndCenterCell(ws);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "preguntas_contestadas_"+String(sessionStorage.getItem("refClue"))+".xlsx");
         
 }

 private wrapAndCenterCell(cell: any) {
  const result = [];
  let row: any;
  let rowNum: any;
  let colNum: any;
  const range = XLSX.utils.decode_range(cell['!ref']);
  for (rowNum = range.s.r; rowNum <= 0; rowNum++) {
      row = [];
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
          const nextCell = cell[
              XLSX.utils.encode_cell({ r: rowNum, c: colNum })
          ];
          if (typeof nextCell === 'undefined') {
              row.push(void 0);
          } else {
              row.push(nextCell.s = { font: { bold: true } });
          }
      }
      result.push(row);
  }
}

  
}
