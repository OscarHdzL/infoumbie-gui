import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MENSAJES_NEGOCIO } from 'src/app/shared/constants/global';
import { Pregunta } from 'src/app/shared/model/cuestionario/pregunta';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';

@Component({
  selector: 'app-cuestionario-campo',
  templateUrl: './cuestionario-campo.component.html',
  styleUrls: ['./cuestionario-campo.component.css']
})
export class CuestionarioCampoComponent implements OnInit {

  @Input() pregunta: Pregunta;
  @Input() form: FormGroup;
  @Output() formChange:EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  
  get isValid() { 
    return !this.form.controls[this.pregunta.id]?.touched || this.form.controls[this.pregunta.id].valid; 
  }

  constructor( private cuestionarioService : CuestionarioService ) { }

  ngOnInit(): void {
    // console.log("Datos entrada [pregunta] ", this.pregunta, "[form] ",this.form);
  }

  ngOnchange(){
    // console.log("Datos entrada [pregunta] ", this.pregunta, "[form] ",this.form);
  }

  public keyPressOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
  
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get mensaje() { return MENSAJES_NEGOCIO; }

  public formUpdate() {
    this.formChange.emit(this.form);
  }

}
