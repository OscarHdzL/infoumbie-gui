import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoClueComponent } from './info-clue/info-clue.component';
import { PrincipalComponent } from './principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RecursosMaterialesComponent } from './recursos-materiales/recursos-materiales.component';
import { PersonalComponent } from './personal/personal.component';
import { AccordionComponent } from './accordion/accordion.component';
import { OfertaServiciosComponent } from './oferta-servicios/oferta-servicios.component';
import { CardListaComponent } from './oferta-servicios/components/card-lista/card-lista.component';
import { TablaComponent } from './oferta-servicios/components/tabla/tabla.component';
import { ModalCarruselComponent } from './oferta-servicios/components/modal-carrusel/modal-carrusel.component';
import { FiltrosBusquedaComponent } from './filtros-busqueda/filtros-busqueda.component';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PlecasImg } from './oferta-servicios/pipes/plecas';
import { GaleriaComponent } from './galeria/galeria.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { MenuSeccionesComponent } from './menu-secciones/menu-secciones.component';
import { PlanAccionComponent } from './plan-accion/plan-accion.component';
import { CardConceptoComponent } from './plan-accion/components/card-concepto/card-concepto.component';
import { DialogoActividadesComponent } from './plan-accion/components/dialogo-actividades/dialogo-actividades.component';
import { ConservacionComponent } from './conservacion/conservacion.component';
import { AreaMedicaComponent } from './area-medica/area-medica.component';
import { ModalComponent } from './galeria/components/modal/modal.component';
import { EstatusPipe } from './plan-accion/pipes/estatus.pipe';
import { RecursosMaterialesGeneralComponent } from './recursos-materiales-general/recursos-materiales-general.component';
import { TablaRecursosMaterialesComponent } from './recursos-materiales-general/components/tabla-recursos-materiales/tabla-recursos-materiales.component';
import { TablaRecursosMaterialesDetalleComponent } from './recursos-materiales-general/components/tabla-recursos-materiales-detalle/tabla-recursos-materiales-detalle.component';
import { TablaAreaMedicaComponent } from './area-medica/components/tabla/tabla-area-medica.component';
import { PlecasImgAreaMedica } from './area-medica/pipes/plecaAreaMedica';
import { TablaConservacionesComponent } from './conservacion/components/tabla-conservaciones/tabla-conservaciones.component';
import { TituloFormatoPipe } from './conservacion/pipes/titulo-formato.pipe';

@NgModule({
  declarations: [
    InfoClueComponent,
    PrincipalComponent,
    RecursosMaterialesComponent,
    PersonalComponent,
    AccordionComponent,
    OfertaServiciosComponent,
    CardListaComponent,
    TablaComponent,
    TablaAreaMedicaComponent,
    ModalCarruselComponent,
    FiltrosBusquedaComponent,
    PlecasImg,
    PlecasImgAreaMedica,
    GaleriaComponent,
    FiltrosBusquedaComponent,
    ResponsableComponent,
    SeguimientoComponent,
    MenuSeccionesComponent,
    PlanAccionComponent,
    CardConceptoComponent,
    DialogoActividadesComponent,
    ConservacionComponent,
    DialogoActividadesComponent,
    AreaMedicaComponent,
    ModalComponent,
    EstatusPipe,
    RecursosMaterialesGeneralComponent,
    TablaRecursosMaterialesComponent,
    TablaRecursosMaterialesDetalleComponent,
    TablaConservacionesComponent,
    TituloFormatoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    MatRadioModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
      AreaMedicaComponent,
      RecursosMaterialesGeneralComponent,
      ConservacionComponent,
      GaleriaComponent
  ]
})
export class SituacionActualModule { }
