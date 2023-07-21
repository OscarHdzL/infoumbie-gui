import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminConsultaComponent } from './admin-home/admin-home.component';
import { AdminConsultaEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';
import { AdminConsultaCluesComponent } from './admin-clues/admin-clues.component';
import { AdminConsultaCualitativoComponent } from './admin-cualitativo/admin-cualitativo.component';
import { FasesComponent } from './fases/fases.component';
import { AdminConsultaCedulasComponent } from './admin-cedulas/admin-cedulas.component';
import { AdminConsultaCedulasDetalleComponent } from './admin-cedulas-detalle/admin-cedulas-detalle.component';

@NgModule({
    declarations: [
      AdminConsultaComponent,
      AdminConsultaEstadisticasComponent,
      AdminConsultaCluesComponent,
      AdminConsultaCualitativoComponent,
      FasesComponent,
      AdminConsultaCedulasComponent,
      AdminConsultaCedulasDetalleComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      FormsModule
      
    ]
  })
  export class AdminConsultaModule { }