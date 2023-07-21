import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIC_ESTATUS, MENSAJES_ERROR, RUBROS, TYPES } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Area } from 'src/app/shared/model/area/area';
import { Cuestionario } from 'src/app/shared/model/cuestionario/cuestionario';
import { Respuesta } from 'src/app/shared/model/cuestionario/respuesta';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';

@Component({
  selector: 'app-cuestionario-forma',
  templateUrl: './cuestionario-forma.component.html',
  styleUrls: ['./cuestionario-forma.component.css']
})

export class CuestionarioFormaComponent implements OnInit {

  @Input() rubroSeleccionado: Rubro;
  @Input() areaSeleccionada: Area;
  @Output() cierreRubro  = new EventEmitter<any>();

  public pageOfItems: Array<any>;

  constructor(private spinner: NgxSpinnerService, private modalDialogService: ModalDialogService,
    private cuestionarioService: CuestionarioService,
    private autenticacionService: AutenticacionService) {
  }

  public cuestionario: Cuestionario;

  public form: FormGroup;

  public indCuestionarioCerrado : boolean = false;
  bloqueo : number = 0;
  idPerfil: number = 0;

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.getCuestionario();
  }

  private getCuestionario() {
    this.spinner.show();
    this.cuestionarioService.getCuestionario(this.areaSeleccionada.idArea, this.rubroSeleccionado.idRubro).subscribe((response: any) => {
      this.spinner.hide();
      this.indCuestionarioCerrado = false;
      switch (response.status) {
        case 200:
          this.cuestionario = response.body;
          if (!this.cuestionario.preguntas) {
            return this.modalDialogService.showDialog('Atención', "Error", "No existe cuestionario asociado al rubro", () => { });
          }
          this.form = this.cuestionarioService.getFormGroupObject(this.cuestionario.preguntas);
          break;
        case 204:
          this.cuestionario = null;
          this.pageOfItems = [];
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    }, () =>{
      this.bloqueo = parseInt(sessionStorage.getItem('bloqueo') != null && sessionStorage.getItem('bloqueo') != undefined 
      ? sessionStorage.getItem('bloqueo') : '0' );

      this.idPerfil = parseInt(this.autenticacionService.usuarioSesion.idPerfil);

      if(this.bloqueo === 1){
        this.form.disable();
      }else{
        this.form.enable()
      }
    });
  }

  public formUpdate(formChange: FormGroup) {
    this.spinner.show();
    this.asignaFormaRespuesta();
    this.cuestionarioService.postCuestionario(this.cuestionario)
      .subscribe((response: any) => {
      this.spinner.hide();
      switch (response.status) {
        case 201:
          this.cuestionario = response.body;
          // if (this.form.valid) {
          //   console.log("Forma válida ");
          // } else {
          //   console.log("Forma NO válida ");
          // }
          break;
        case 204:
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }


  private asignaFormaRespuesta() {
    Object.keys(this.form.controls).forEach(key => {
      var pregunta = this.cuestionario.preguntas.find(x => x.id === Number(key));
      if (pregunta) {
        if (this.form.controls[key].value != "" && pregunta.values.find(x => x) != this.form.controls[key].value) {
          if(pregunta.id == Number(key) && pregunta.type != TYPES.RADIO){
            let respuesta : Respuesta = new Respuesta();
            respuesta.value = this.form.controls[key].value;
            respuesta.code = Number(pregunta.options[0].code);
            pregunta.values = [];
            pregunta.values.push(respuesta);
          }else if(pregunta.id == Number(key)){
            let respuesta : Respuesta = new Respuesta();
            respuesta.code = this.form.controls[key].value;
            for (let index = 0; index < pregunta.options?.length; index++) {
              const element = pregunta.options[index];
              if(element.code === Number(this.form.controls[key].value)){
                respuesta.value = element.value;
                break;
              }
            }
            pregunta.values = [];
            pregunta.values.push(respuesta);
          }
        }
      }
    });
  }

  public cerrarCuestionario(){

    this.spinner.show();

    let rubroCuestiona: RubroCuestiona = new RubroCuestiona();

    rubroCuestiona.cveUsuario = this.autenticacionService.usuarioSesion.cveUsuario;
    rubroCuestiona.idArea = this.areaSeleccionada.idArea;
    rubroCuestiona.idClues = Number(sessionStorage.getItem("idClues"));
    rubroCuestiona.idEstatus = EIC_ESTATUS.FINALIZADO;
    rubroCuestiona.idRubro = this.rubroSeleccionado.idRubro;

    this.cuestionarioService.postCerrarCuestionario(rubroCuestiona)
      .subscribe((response: any) => {
      this.spinner.hide();
      window.scroll(0,0);
      //this.getCuestionario();
      this.indCuestionarioCerrado = true;
      this.cierreRubro.emit(null);
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    window.scroll(0,0);
    this.pageOfItems = pageOfItems;
  }

  public get rubros() : typeof RUBROS {
    return RUBROS;
  }

  get navegacion() {
    return NAVEGACION;
  }
}
