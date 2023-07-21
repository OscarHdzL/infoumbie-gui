import { UnidadesPorConfirmarDetalleComponent } from './unidades-por-confirmar-detalle/unidades-por-confirmar-detalle.component';
import { PeriodoCompComponent } from './periodo-comp/periodo-comp.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SeguimientoHomeComponent } from './seguimiento-home/seguimiento-home.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TablaConsultaComponent } from './consulta/tabla-consulta/tabla-consulta.component';
import { getDutchPaginatorIntl } from './consulta/componentes/paginador';
import { PorcentajesComponent } from './porcentajes/porcentajes.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { ModalCalendarioComponent } from './consulta/componentes/modal-calendario/modal-calendario.component';
import { CardBoxComponent } from './components/card-box/card-box.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { SinResultadosComponent } from './components/sin-resultados/sin-resultados.component';
import { EstadoBusquedaComponent } from './estado-busqueda/estado-busqueda.component';
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlanTrabajoComponent } from './plan-trabajo/plan-trabajo.component';
import { EstatusSemanalComponent } from './estatus-semanal/estatus-semanal.component';
import { AvanceSemanalMesaTrabajoComponent } from "./avance-semanal-mesa-trabajo/avance-semanal-mesa-trabajo.component";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ComentariosUnidadesComponent } from './comentarios-unidades/comentarios-unidades.component';
import { TablaComentariosComponent } from './comentarios-unidades/tabla-comentarios/tabla-comentarios.component';
import { NuevoComentarioComponent } from './comentarios-unidades/nuevo-comentario/nuevo-comentario.component';
import { SubheaderSeguimientoComponent } from './subheader-seguimiento/subheader-seguimiento.component';
import { TotalUnidadesComponent } from './total-unidades/total-unidades.component';
import { TablaTotalUnidadesComponent } from './total-unidades/tabla-total-unidades/tabla-total-unidades.component';
import { FiltroTotalUnidadesComponent } from './total-unidades/filtro-total-unidades/filtro-total-unidades.component';
import { GaleriaSeguimientoComponent } from './galeria-seguimiento/galeria-seguimiento.component';
import { ModalCancelarComponent } from './components/modal-cancelar/modal-cancelar.component';
import { AvanceSemanalComponent } from './avance-semanal/avance-semanal.component';
import { AvanceGeneralComponent } from './avance-general/avance-general.component';
import { TablaIndicadoresComponent } from './components/tabla-indicadores/tabla-indicadores.component';
import { SegSitActualComponent } from './seg-sit-actual/seg-sit-actual.component';
import {SituacionActualModule} from "../situacion-actual/situacion-actual.module";
import {MenuSegSitactualComponent} from "./seg-sit-actual/menu-seg-sitactual/menu-seg-sitactual.component";
import { PanelCardComponent } from './components/panel-card/panel-card.component';
import { AccesoExternoAvanceComponent } from './acceso-externo-avance/acceso-externo-avance.component';
import { FiltroComponent } from './consulta/filtro/filtro.component';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from '../shared/model/seguimiento/config.datepicker';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';

import { TituloComponent } from './consulta/componentes/titulo/titulo.component';
//import { UnidadesPorConfirmarComponent } from './consulta/componentes/unidades-por-confirmar/unidades-por-confirmar.component';
import { FiltroConfirmadasComponent } from './consulta/componentes/unidades-confirmadas/componentes/filtro-confirmadas/filtro-confirmadas.component';
import { TablaConfirmadasComponent } from './consulta/componentes/unidades-confirmadas/componentes/tabla-confirmadas/tabla-confirmadas.component';
import { UnidadesConfirmadasComponent } from './consulta/componentes/unidades-confirmadas/unidades-confirmadas.component';
import { FiltroPorConfirmarComponent } from './consulta/componentes/unidades-por-confirmar/componentes/filtro-por-confirmar/filtro-por-confirmar.component';
import { TablaPorConfirmarComponent } from './consulta/componentes/unidades-por-confirmar/componentes/tabla-por-confirmar/tabla-por-confirmar.component';
import { TitularComponent } from './components/titular/titular.component';
import { UnidadesPorConfirmarComponent } from './unidades-por-confirmar/unidades-por-confirmar.component';
import { UnidadesPorConfirmar2Component } from './consulta/componentes/unidades-por-confirmar/unidades-por-confirmar2.component';
import { AgregarAlertaComponent } from './alerta-detalle/componentes/agregar-alerta/agregar-alerta.component';
import { AlertaCarruselComponent } from './alerta-carrusel/alerta-carrusel.component';
import { AlertasDetalleComponent } from './alertas-detalle/alertas-detalle.component';
import { TablaAlertasComponent } from './alertas-detalle/tabla-alertas/tabla-alertas.component';
import { FiltrosAlertasComponent } from './alertas-detalle/filtros-alertas/filtros-alertas.component';
import { ParrafoAlertasComponent } from './alertas-detalle/parrafo-alertas/parrafo-alertas.component';
import { AcordeonMesasTrabajoComponent } from './components/acordeon-mesas-trabajo/acordeon-mesas-trabajo.component';
import { AcordeonEntidadFederativaComponent } from './components/acordeon-entidad-federativa/acordeon-entidad-federativa.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    SeguimientoHomeComponent,
    PeriodoCompComponent,
    PorcentajesComponent,
    UnidadesComponent,
    ConsultaComponent, 
    TablaConsultaComponent, 
    ModalCalendarioComponent,
    CardBoxComponent, 
    SubtitleComponent, 
    SinResultadosComponent, 
    EstadoBusquedaComponent,
    PlanTrabajoComponent,
    EstatusSemanalComponent,
    ConsultaComponent,
    TablaConsultaComponent,
    AvanceSemanalMesaTrabajoComponent,
    FileUploadComponent,
    ComentariosUnidadesComponent,
    TablaComentariosComponent,
    NuevoComentarioComponent,
    SubheaderSeguimientoComponent,
    TotalUnidadesComponent,
    TablaTotalUnidadesComponent,
    FiltroTotalUnidadesComponent,
    GaleriaSeguimientoComponent,
    ModalCancelarComponent,
    AvanceSemanalComponent,
    AvanceGeneralComponent,
    TablaIndicadoresComponent,
    SegSitActualComponent,
    MenuSegSitactualComponent,
    PanelCardComponent,
    AccesoExternoAvanceComponent,
    FiltroComponent,
    ToggleSwitchComponent,
    TituloComponent,
    UnidadesPorConfirmarComponent,
    FiltroConfirmadasComponent,
    TablaConfirmadasComponent,
    UnidadesConfirmadasComponent,
    FiltroPorConfirmarComponent,
    TablaPorConfirmarComponent,
    UnidadesPorConfirmarDetalleComponent,
    TitularComponent,
    UnidadesPorConfirmar2Component,
    AgregarAlertaComponent,
    AlertaCarruselComponent,
    AlertasDetalleComponent,
    TablaAlertasComponent,
    FiltrosAlertasComponent,
    ParrafoAlertasComponent,
    AcordeonMesasTrabajoComponent,
    AcordeonEntidadFederativaComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    SituacionActualModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  ],
})

export class SeguimientoModule { }
