import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormFiltros } from 'src/app/shared/model/seguimiento/alertas';
import { CustomeDateValidators } from 'src/app/shared/validators/validate-fechas-filtro';

@Component({
  selector: 'app-filtros-alertas',
  templateUrl: './filtros-alertas.component.html',
  styleUrls: ['./filtros-alertas.component.css']
})
export class FiltrosAlertasComponent implements OnInit {

  public filtros: FormGroup = this.fb.group({
    fechaUno:[],
    fechaDos:[],
    estatus: []
  },{ 
    validator:[
      CustomeDateValidators.fechaFin('fechaUno', 'fechaDos')
    ]
  }
  );
  @Output() public dataForm = new EventEmitter();
  private data: FormFiltros = new FormFiltros();

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
  }

  public limpiar(): void{
    this.data = new FormFiltros();
    this.limpiarForm();
    this.dataForm.emit({...this.data});
  }

  public buscar(): void{
    this.data = {
      fechaInicio: this.toStringFecha(this.filtros.controls.fechaUno.value),
      fechaFin: this.toStringFecha(this.filtros.controls.fechaDos.value),
      estatus: this.filtros.controls.estatus.value
    };

    //enviamos datos de formulario filtros a consulta
    this.dataForm.emit({...this.data});
  }

  //Metodo para transformar valor de input date a string
  private toStringFecha(date: Date): any {
    if (date) {
      return this.datepipe.transform(date, 'yyyy-MM-dd');
    }
    return null;
  }

  public limpiarForm(): void{
    this.filtros.reset();
  }

}
