import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CuestionarioDinamicoModule } from '../cuestionario-dinamico/cuestionario-dinamico.module';

import { FormsModule } from '@angular/forms';
import { DragNDropDirective } from '../shared/directive/drag-n-drop.directive';
import { CargaArchivosComponent } from './carga-archivos/carga-archivos.component';



@NgModule({
  declarations: [
    CargaArchivosComponent,
    DragNDropDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CuestionarioDinamicoModule,
    FormsModule
  ]
})
export class ArchivosModule { }
