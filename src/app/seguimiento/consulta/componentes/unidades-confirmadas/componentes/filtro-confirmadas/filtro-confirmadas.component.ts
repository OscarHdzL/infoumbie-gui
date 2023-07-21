import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormFiltros } from 'src/app/shared/model/seguimiento/consultaUnidades';
import { CustomeDateValidators } from '../validate-fechas-filtro';

@Component({
  selector: 'app-filtro-confirmadas',
  templateUrl: './filtro-confirmadas.component.html',
  styleUrls: ['./filtro-confirmadas.component.css']
})
export class FiltroConfirmadasComponent implements OnInit {

  @Output() public dataForm = new EventEmitter();

  public filtros: FormGroup = this.fb.group({
    palabra:[],
    fechaUno: [],
    fechaDos:[]
  },{ 
    validator:[
      CustomeDateValidators.fechaFin('fechaUno', 'fechaDos')
    ]
  }
  );

  public disableBtn: Boolean = false;
  private data: FormFiltros = new FormFiltros();
  public inputFechaFinDisable: Boolean = true;

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.filtros.controls.fechaUno.valueChanges
    .subscribe(valor => {
      if(valor !== null){
        this.inputFechaFinDisable = false;
      }else{
        this.inputFechaFinDisable = true;
      }
    })
  }

  public buscar(){
   
    this.data = {
      palabra:  (this.filtros.controls.palabra.value === null) ? null : this.filtros.controls.palabra.value.toUpperCase(),
      fechaUno: this.toStringFecha(this.filtros.controls.fechaUno.value),
      fechaDos: this.toStringFecha(this.filtros.controls.fechaDos.value)
    };

    //enviamos datos de formulario filtros a consulta
    this.dataForm.emit({...this.data});
  }

  public limpiar(){
    this.data = new FormFiltros();
    this.limpiarForm();
    this.dataForm.emit({...this.data});
  }

  //Metodo para transformar valor de input date a string
  private toStringFecha(date: Date): any {
    if (date) {
      return this.datepipe.transform(date, 'dd/MM/yyyy');
    }
    return null;
  }

  public limpiarForm(){
    this.filtros.reset();
  }


}
