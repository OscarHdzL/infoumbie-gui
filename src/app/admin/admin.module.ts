import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin-home/admin-home.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';
import { AdminCluesComponent } from './admin-clues/admin-clues.component';
import { AdminCualitativoComponent } from './admin-cualitativo/admin-cualitativo.component';
import { FasesComponent } from './fases/fases.component';
import { AdminCedulasComponent } from './admin-cedulas/admin-cedulas.component';
import { AdminCedulasDetalleComponent } from './admin-cedulas-detalle/admin-cedulas-detalle.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminUsuariosDetalleComponent } from './admin-usuarios/admin-usuarios-detalle/admin-usuarios-detalle.component';
import { AdminEncuestasComponent } from './admin-encuestas/admin-encuestas.component';
import { ModalNuevaAreaComponent } from './admin-encuestas/modal-nueva-area/modal-nueva-area.component';
import { ModalRubroComponent } from './admin-encuestas/modal-rubro/modal-rubro.component';
import { ModalPreguntaComponent } from './admin-encuestas/modal-pregunta/modal-pregunta.component';
import { MatCardModule } from '@angular/material/card';
import { AcordeonRubrosComponent } from './admin-encuestas/acordeon-rubros/acordeon-rubros.component';
import { RubrosPreguntasComponent } from './admin-encuestas/acordeon-rubros/rubros-preguntas/rubros-preguntas.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalNuevaRespuestaComponent } from './admin-encuestas/modal-nueva-respuesta/modal-nueva-respuesta.component';

@NgModule({
    declarations: [
      AdminComponent,
      AdminEstadisticasComponent,
      AdminCluesComponent,
      AdminCualitativoComponent,
      FasesComponent,
      AdminCedulasComponent,
      AdminCedulasDetalleComponent,
      AdminUsuariosComponent,
      AdminUsuariosDetalleComponent,
      AdminEncuestasComponent,
      ModalNuevaAreaComponent,
      ModalRubroComponent,
      ModalPreguntaComponent,
      AcordeonRubrosComponent,
      RubrosPreguntasComponent,
      ModalNuevaRespuestaComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      FormsModule, 
      ReactiveFormsModule,
      MatCardModule,
      MatSelectModule,
    ]
  })
  export class AdminModule { }