import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalCalendarioComponent } from 'src/app/seguimiento/consulta/componentes/modal-calendario/modal-calendario.component';


@Component({
  selector: 'app-tabla-por-confirmar',
  templateUrl: './tabla-por-confirmar.component.html',
  styleUrls: ['./tabla-por-confirmar.component.css']
})
export class TablaPorConfirmarComponent implements OnChanges {

  @Input() public datos: any[] = [];
  @Input() public loading: boolean;
  @Input() public idEstado: boolean;
  @Input() public nomEntidad: string;
  @Input() public descNivel: string;
  @Input() public tipoUnidad: number;
  public permisoPermitido: Boolean = false;

  public displayedColumns: string[] = 
  [
    'rowNum',
    'nomClue', 
    'nomMunicipio', 
    'confirmar', 
    'fechaConfirmacion'
  ];

  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router

  ) { }

  
  ngOnChanges(changes: SimpleChanges): void{
   // this.loading = true;
    //console.log("LOADING",this.loading);
    //console.log("DATA CONSULTA",changes);
    
    if(changes.datos.currentValue && changes.datos.currentValue.length > 0){
      this.dataSource = new MatTableDataSource<any>(changes.datos.currentValue);
      this.dataSource.paginator = this.paginator;    
    }else {
      this.dataSource = new MatTableDataSource<any>(changes.datos.currentValue);
      this.dataSource.paginator = this.paginator;  
    }
  }

  public mostrarModal(cveClue: number){
    let datos = {
      cveClue: cveClue,
      tipoUnidad: this.tipoUnidad
    };
    
    this.dialog.open(ModalCalendarioComponent,{
      width:'700px',
      autoFocus: false,
      data: datos,
      disableClose: true
    });
  }

  public permiso(valor: Boolean): void{
    this.permisoPermitido = valor;
  }

}
