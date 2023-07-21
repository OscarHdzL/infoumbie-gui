import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenedorCuestionarioComponent } from './contenedor-cuestionario/contenedor-cuestionario.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CuestionarioDinamicoModule } from '../cuestionario-dinamico/cuestionario-dinamico.module';
import { CuestionarioEstaticoModule } from '../cuestionario-estatico/cuestionario-estatico.module';


@NgModule({
  declarations: [ContenedorCuestionarioComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CuestionarioDinamicoModule,
    CuestionarioEstaticoModule
  ]
})
export class ContenedorCuestionarioModule { }
