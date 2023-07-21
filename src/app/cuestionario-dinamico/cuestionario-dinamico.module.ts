import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuestionarioFormaComponent } from './cuestionario-forma/cuestionario-forma.component';
import { CuestionarioCampoComponent } from './cuestionario-campo/cuestionario-campo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { JwPaginationModule } from 'jw-angular-pagination';


@NgModule({
  declarations: [CuestionarioFormaComponent, CuestionarioCampoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    JwPaginationModule
  ], exports: [
    CuestionarioFormaComponent,
    CuestionarioCampoComponent
  ]
})
export class CuestionarioDinamicoModule { }
