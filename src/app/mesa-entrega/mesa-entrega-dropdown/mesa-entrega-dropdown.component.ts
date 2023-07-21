import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-mesa-entrega-dropdown',
  templateUrl: './mesa-entrega-dropdown.component.html',
  styleUrls: ['./mesa-entrega-dropdown.component.scss']
})
export class MesaEntregaDropdownComponent implements OnInit {
  public listMesaEntrega: vwMesaEntregaModel[] = [];

  @ViewChild('singleSelectEstado', {static: true}) singleSelectEstado: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  public entidad: string = null;
  public cveEntidad: string = null;
  public isGobernador = false;
  /* public entidadSelect: Entidad; */
  private estadoStr: string = null;

  formFiltro: FormGroup = this.fb.group({
    mesa: ['', [Validators.required]],
  });

  mesaServiceSubscription$: Subscription;
  mesaActualModel: vwMesaEntregaModel = new vwMesaEntregaModel();

  constructor(
    private fb: FormBuilder, 
    private mesaEntregaService: MesaEntregaService,
    private modalDialogService: ModalDialogService,
    ) {

      this.mesaServiceSubscription$ = this.mesaEntregaService.getMesaEntregaActual().subscribe(
        (data) => {
       
          console.log("MesaActual" , data);
          this.mesaActualModel = data;
          //this.formFiltro.get('mesa').setValue(this.mesaActualModel);
        });
  }

  ngOnInit(): void {
    
    this.obtenerMesas();

  }


  public obtenerMesas(){
    this.mesaEntregaService.getVwMesaEntrega().subscribe((response: any) => {
     
      
      if (response === undefined || response === null || response.lenght === 0) {
        //console.log('me meto en esto 🧨');
      } else {
        this.listMesaEntrega = response;
       var list = this.listMesaEntrega.sort((a,b) => {
        return a.id - b.id
      });
        
      this.formFiltro.get('mesa').setValue(this.mesaActualModel.id);

      }
    }, (err: any) => {
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error', () => { });
    })
  }


  seleccionaMesa(){
    
  }


  ngAfterViewInit(): void {
    //this.setInitialValueEntidad();
  }

  ngOnDestroy(): void {

    if (this.mesaServiceSubscription$) {
      this.mesaServiceSubscription$.unsubscribe();
    }


    this._onDestroy.next();
    this._onDestroy.complete();

  }


  mesaChange(mesa: number){
    
    this.mesaEntregaService.setMesaEntregaActual(this.listMesaEntrega.find(x=>x.id == mesa));
  }
  
}
