import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { TotalUnidades, Unidades } from 'src/app/shared/model/seguimiento/totalUnidades';
import { ModalCalendarioComponent } from 'src/app/seguimiento/consulta/componentes/modal-calendario/modal-calendario.component';

@Component({
  selector: 'app-tabla-total-unidades',
  templateUrl: './tabla-total-unidades.component.html',
  styleUrls: ['./tabla-total-unidades.component.css']
})
export class TablaTotalUnidadesComponent implements OnInit {

  @Input() public listaUnidades: Unidades[] = [];
  @Input() public loading: boolean;
  @Input() public cveEntidad: boolean;
  @Input() public descNivel: string;
  @Input() public nomEntidad: string;
  @Output() public dataCerrarModal = new EventEmitter<any>();

  public displayedColumns: string[] = 
  [
    'rowNum',
    'nomClue', 
    'nomMunicipio', 
    'nivelAtencion',
    'fechaTransferencia', 
    'comentarios'
  ];

  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private dialog: MatDialog, 
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void{
    //console.log("DATA TABLA TOTAL UNIDADES",changes);
    if(changes.listaUnidades.currentValue && changes.listaUnidades.currentValue.length > 0){
      this.dataSource = new MatTableDataSource<Unidades>(changes.listaUnidades.currentValue);
      this.dataSource.paginator = this.paginator;    
    }else{
      this.dataSource = new MatTableDataSource<Unidades>(changes.listaUnidades.currentValue);
      this.dataSource.paginator = this.paginator; 
    }
  }

  public mostrarModal(cveClue: number): void{
    let datos = {
      cveClue: cveClue
    };
    const dialogRef = this.dialog.open(ModalCalendarioComponent,{
      width:'700px',
      autoFocus: false,
      data: datos,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      this.dataModal();
    })  
  }

  private dataModal(): void{
    this.dataCerrarModal.emit({
      cveEntidad: this.cveEntidad,
      descripcion: this.descNivel
    })
  }

  

  irComentarios(cveClue: number, nomClue: string, nomNivelAtencion: string, ruta: string){

    this.router.navigate([NAVEGACION.comentarios], {
      queryParams: {
        cveClue: cveClue,
        nomClue: nomClue,
        cveEntidad: this.cveEntidad,
        nomEntidad: (this.nomEntidad === null || this.nomEntidad === undefined) ? '': this.nomEntidad,
        descNivel: nomNivelAtencion,
        ruta: ruta
      }
    })
  }

}
