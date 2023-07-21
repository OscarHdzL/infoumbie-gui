import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RUBROS } from 'src/app/shared/constants/global';
import { Area } from 'src/app/shared/model/area/area';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { RubroService } from 'src/app/shared/services/rubro/rubro.service';

@Component({
  selector: 'app-contenedor-cuestionario-estatico',
  templateUrl: './contenedor-cuestionario-estatico.component.html',
  styleUrls: ['./contenedor-cuestionario-estatico.component.css']
})
export class ContenedorCuestionarioEstaticoComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private rubroService: RubroService) { }

  @Input() rubroSeleccionado: Rubro;
  @Input() areaSeleccionada: Area;
  @Output() cierreRubroEstatico  = new EventEmitter<any>();

  ngOnInit(): void {
  }

  public get rubros() : typeof RUBROS {
    return RUBROS;
  }

  public cierreRubro(){
    this.cierreRubroEstatico.emit(null);
  }

}
