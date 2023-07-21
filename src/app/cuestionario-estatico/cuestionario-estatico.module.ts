import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ContenedorCuestionarioEstaticoComponent } from './contenedor-cuestionario-estatico/contenedor-cuestionario-estatico.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CuestionarioEstaticoReferenciasComponent } from './cuestionario-estatico-referencias/cuestionario-estatico-referencias.component';
import { CuestionarioEstaticoAutocompleteListComponent } from './cuestionario-estatico-autocomplete-list/cuestionario-estatico-autocomplete-list.component';
import { FormsModule } from '@angular/forms';

import { CuestionarioEstaticoMedicamentosComponent } from './cuestionario-estatico-medicamentos/cuestionario-estatico-medicamentos.component';
import { CuestionarioEstaticoAtencionMedicaComponent } from './cuestionario-estatico-atencion-medica/cuestionario-estatico-atencion-medica.component';
import { CuestionarioEstaticoUrgenciasComponent } from './cuestionario-estatico-urgencias/cuestionario-estatico-urgencias.component';
import { CuestionarioEstaticoHospitalizacionComponent } from './cuestionario-estatico-hospitalizacion/cuestionario-estatico-hospitalizacion.component';
import { CuestionarioEstaticoInsumosComponent } from './cuestionario-estatico-insumos/cuestionario-estatico-insumos.component';
import { CargaBienesMueblesComponent } from './carga-bienes-muebles/carga-bienes-muebles.component';
import { CargaConservacionComponent } from './carga-conservacion/carga-conservacion.component';
import { CargaMedicamentosComponent } from './carga-medicamentos/carga-medicamentos.component';
import { DragNDropDirective } from '../shared/directive/drag-n-drop.directive';

@NgModule({
  declarations: [
    //DragNDropDirective,
    ContenedorCuestionarioEstaticoComponent, 
    CuestionarioEstaticoReferenciasComponent, 
    CuestionarioEstaticoAutocompleteListComponent, 
    CuestionarioEstaticoMedicamentosComponent, 
    CuestionarioEstaticoAtencionMedicaComponent, 
    CuestionarioEstaticoUrgenciasComponent, 
    CuestionarioEstaticoHospitalizacionComponent,
    CuestionarioEstaticoInsumosComponent, 
    CargaBienesMueblesComponent, 
    CargaConservacionComponent, 
    CargaMedicamentosComponent,
    
    ],
     
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ], exports: [
    ContenedorCuestionarioEstaticoComponent
  ]
})
export class CuestionarioEstaticoModule { }
