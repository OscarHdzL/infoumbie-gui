import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Unidades } from 'src/app/shared/model/seguimiento/consultaUnidades';
import { ModalCalendarioComponent } from 'src/app/seguimiento/consulta/componentes/modal-calendario/modal-calendario.component';
import {SeguiSitActualService} from "../../../shared/services/seguimiento/segui-sit-actual.service";

@Component({
  selector: 'app-tabla-consulta',
  templateUrl: './tabla-consulta.component.html',
  styleUrls: ['./tabla-consulta.component.css']
})
export class TablaConsultaComponent implements OnChanges {
  @Input() public datos: Unidades[] = [];
  @Input() public loading: boolean;
  @Input() public idEstado: boolean;
  @Input() public nomEntidad: string;
  @Input() public descNivel: string;
  public permisoPermitido: Boolean = false;

  public displayedColumns: string[] = 
  [
    'rowNum',
    'nomClue', 
    'nomMunicipio', 
    'fechaTransferencia', 
    'comentarios',
    'galeria'
  ];

  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private seguiSitActualService:SeguiSitActualService

  ) { }

  
  ngOnChanges(changes: SimpleChanges): void{
   // this.loading = true;
    //console.log("LOADING",this.loading);
    //console.log("DATA CONSULTA",changes);
    
    if(changes.datos.currentValue && changes.datos.currentValue.length > 0){
      this.dataSource = new MatTableDataSource<Unidades>(changes.datos.currentValue);
      this.dataSource.paginator = this.paginator;    
    }else {
      this.dataSource = new MatTableDataSource<Unidades>(changes.datos.currentValue);
      this.dataSource.paginator = this.paginator;  
    }
  }

  public mostrarModal(cveClue: number){
    let datos = {
      cveClue: cveClue
    };
    
    this.dialog.open(ModalCalendarioComponent,{
      width:'700px',
      autoFocus: false,
      data: datos,
      disableClose: true
    });
  }

  irComentarios(cveClue: number, nomClue: string, ruta: string){

    this.router.navigate([NAVEGACION.comentarios], {
      queryParams: {
        cveClue: cveClue,
        nomClue: nomClue,
        cveEntidad: this.idEstado,
        nomEntidad: this.nomEntidad,
        descNivel: this.descNivel,
        ruta: ruta
      }
    })
  }

  irSituacionActual(unidad: Unidades) {
    this.seguiSitActualService.setUnidad$(unidad);
    this.router.navigate([NAVEGACION.seguimientoSitActual]);
  }

  public permiso(valor: Boolean): void{
    //console.log("PERMISOS PERMISOS", valor);
    this.permisoPermitido = valor;
  }

}
