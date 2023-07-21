import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TotalUnidades, Unidades, UnidadesFiltro } from 'src/app/shared/model/seguimiento/totalUnidades';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { TotalUnidadesService } from 'src/app/shared/services/seguimiento/total-unidades.service';

@Component({
  selector: 'app-filtro-total-unidades',
  templateUrl: './filtro-total-unidades.component.html',
  styleUrls: ['./filtro-total-unidades.component.css']
})
export class FiltroTotalUnidadesComponent implements OnInit {

  public nivel = new FormControl();
  @Input() private cveEntidad: number;
  @Output() public dataFiltro = new EventEmitter<TotalUnidades>();
  public listaUnidades: Unidades[] = [];
  
  constructor(
    private totalUnidadesService: TotalUnidadesService,
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit(): void {

  }

  public buscar(){
    
    this.spinner.show();
    this.totalUnidadesService.getTotalUnidades(this.cveEntidad, this.nivel.value)
    .subscribe((resp:any)=>{
      
      this.spinner.hide();
      //this.listaUnidades = resp.unidades;
      this.enviarDatos(resp);
    
    }, (err)=>{
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error', () => { });
    });
  }


  private enviarDatos(dataUnidades: TotalUnidades){
    this.dataFiltro.emit({
      unidades: dataUnidades.unidades,
      totalTransferidas: dataUnidades.totalTransferidas,
      totalUnidades: dataUnidades.totalUnidades
    });
  }

}
