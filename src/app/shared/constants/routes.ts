
import { UnidadesPorConfirmarDetalleComponent } from './../../seguimiento/unidades-por-confirmar-detalle/unidades-por-confirmar-detalle.component';

import { Routes } from '@angular/router';
import { AutenticacionGuardGuard } from '../security/autentication-guard';
import { NAVEGACION } from './navigation';
import { LoginComponent } from 'src/app/autenticacion/login/login.component';
import { HomeComponent } from 'src/app/home/home/home.component';
import { ContenedorCuestionarioComponent } from 'src/app/contenedor-cuestionario/contenedor-cuestionario/contenedor-cuestionario.component';
import { CuestionarioFormaComponent } from 'src/app/cuestionario-dinamico/cuestionario-forma/cuestionario-forma.component';
import { ControlPrimerAccesoComponent } from 'src/app/autenticacion/control-primer-acceso/control-primer-acceso.component';
import { CargaArchivosComponent } from 'src/app/archivos/carga-archivos/carga-archivos.component';
import { AdminComponent } from 'src/app/admin/admin-home/admin-home.component';
import { AdminConsultaComponent } from 'src/app/admin-consultas/admin-home/admin-home.component';
import { PrevioComponent } from 'src/app/home/previo/previo.component';
import { FasesComponent } from 'src/app/admin/fases/fases.component';
import { AdminCluesPublicComponent } from 'src/app/admin-public/admin-clues/admin-clues.component';
import { PrincipalComponent } from 'src/app/situacion-actual/principal/principal.component';
import {SeleccionComponent} from "../../seleccion/seleccion/seleccion.component";
import { ResolveService } from '../services/situacion-actual/resolve.service';
import { SeguimientoHomeComponent } from 'src/app/seguimiento/seguimiento-home/seguimiento-home.component';
import { ConsultaComponent } from 'src/app/seguimiento/consulta/consulta.component';
import { ComentariosUnidadesComponent } from 'src/app/seguimiento/comentarios-unidades/comentarios-unidades.component';
import { TotalUnidadesComponent } from 'src/app/seguimiento/total-unidades/total-unidades.component';
import { AvanceGeneralComponent } from 'src/app/seguimiento/avance-general/avance-general.component';
import {SegSitActualComponent} from "../../seguimiento/seg-sit-actual/seg-sit-actual.component";
import {PlanTrabajoComponent} from "../../seguimiento/plan-trabajo/plan-trabajo.component";
import {AccesoExternoAvanceComponent} from "../../seguimiento/acceso-externo-avance/acceso-externo-avance.component";
import {PermisoResolveService} from "../services/seguimiento/permiso-resolve.service";
import { AlertasDetalleComponent } from 'src/app/seguimiento/alertas-detalle/alertas-detalle.component';

import { AvanceSemanalMesaTrabajoComponent } from 'src/app/seguimiento/avance-semanal-mesa-trabajo/avance-semanal-mesa-trabajo.component';
import { AvanceSemanalComponent } from 'src/app/seguimiento/avance-semanal/avance-semanal.component';
import { AvanceGeneralEntregaRecepcionComponent } from 'src/app/mesa-entrega/avance-general-entrega-recepcion/avance-general-entrega-recepcion.component';
import { MesaEntregaRecepcionGenericoComponent } from 'src/app/mesa-entrega/mesa-entrega-recepcion-generico/mesa-entrega-recepcion-generico.component';
import { ComentarioMesaEntregaComponent } from 'src/app/mesa-entrega/mesa-entrega-recepcion-generico/comentario-mesa-entrega/comentario-mesa-entrega.component';

export const appRoutes: Routes = [
   {
      path: NAVEGACION.avance_entrega_recepcion,
      pathMatch: 'full',
      component: AvanceGeneralEntregaRecepcionComponent
   },
   {
      path: 'avance-semanal-mesa-trabajo',
      pathMatch: 'full',
      component: AvanceSemanalMesaTrabajoComponent
   },
   {
      path: 'avance-semanal',
      pathMatch: 'full',
      component: AvanceSemanalComponent
   },
   {
      path: NAVEGACION.mesa_entrega_recepcion + '/:id',
      pathMatch: 'full',
      component: MesaEntregaRecepcionGenericoComponent
   },
   {
      path: NAVEGACION.comentario_mesa_entrega + '/:mesa/:id',
      pathMatch: 'full',
      component: ComentarioMesaEntregaComponent
   },
   {  
      path: NAVEGACION.login,
      pathMatch: 'full',
      component: LoginComponent
   },
   {  
      path: NAVEGACION.cuestionario.dinamico,
      pathMatch: 'full',
      component: CuestionarioFormaComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_1",
            "ROLE_2",
            "ROLE_3",
            "ROLE_4",
            "ROLE_5",
            "ROLE_6",
            "ROLE_7",
            "ROLE_9"
         ]
      }
   },
   {
      path: NAVEGACION.controlAccesoPrimeraVez,
      pathMatch: 'full',
      component: ControlPrimerAccesoComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_1",
            "ROLE_2",
            "ROLE_3",
            "ROLE_4",
            "ROLE_5",
            "ROLE_6",
            "ROLE_7"
         ]
      }
   },
   {
      path: NAVEGACION.cuestionario.contenedor,
      pathMatch: 'full',
      component: ContenedorCuestionarioComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_1",
            "ROLE_2",
            "ROLE_3",
            "ROLE_4",
            "ROLE_5",
            "ROLE_6",
            "ROLE_7",
            "ROLE_9"
         ]
      }
   },
   {
      path: NAVEGACION.archivos,
      pathMatch: 'full',
      component: CargaArchivosComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_1",
            "ROLE_2",
            "ROLE_3",
            "ROLE_4",
            "ROLE_5",
            "ROLE_6",
            "ROLE_7",
            "ROLE_9"
         ]
      }
   },
   {
      path: NAVEGACION.home,
      pathMatch: 'full',
      component: HomeComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_1",
            "ROLE_2",
            "ROLE_3",
            "ROLE_4",
            "ROLE_5",
            "ROLE_6",
            "ROLE_7",
            "ROLE_9"
         ]
      }
   },
   {
      path: NAVEGACION.situacion_actual,
      component: PrincipalComponent,
      //resolve: { token: ResolveService },
      data: {
         roles: [
            "ROLE_8",
            "ROLE_13",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.seguimiento,
      canActivate: [AutenticacionGuardGuard],
      component: SeguimientoHomeComponent,
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.consulta,
      component: ConsultaComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
         path: NAVEGACION.comentarios,
         component: ComentariosUnidadesComponent,
         canActivate: [AutenticacionGuardGuard],
         data: {
            roles: [
               "ROLE_8",
               "ROLE_17",
               "ROLE_18",
               "ROLE_19",
               "ROLE_20",
               "ROLE_21",
               "ROLE_22",
               "ROLE_23",
               "ROLE_24",
               "ROLE_25",
               "ROLE_26",
               "ROLE_27",
               "ROLE_28",
               "ROLE_29",
               "ROLE_30",
               "ROLE_31",
               "ROLE_32",
               "ROLE_61",
               "ROLE_33"
            ]
         }      
   },
   {
      path: NAVEGACION.totalUnidades,
      component: TotalUnidadesComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.avance,
      component: AvanceGeneralComponent,
      //canActivate: [AutenticacionGuardGuard],
      //resolve : { permisos : PermisoResolveService },
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }      
   },
   {
      path: NAVEGACION.seleccion,
      pathMatch: 'full',
      canActivate: [AutenticacionGuardGuard],
      component: SeleccionComponent,
      data: {
         roles: [
            "ROLE_8",
            "ROLE_13",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.detalleAlertas,
      canActivate: [AutenticacionGuardGuard],
      component: AlertasDetalleComponent,
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.previo,
      pathMatch: 'full',
      component: PrevioComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_1",
            "ROLE_2",
            "ROLE_3",
            "ROLE_4",
            "ROLE_5"
         ]
      }
   },
   {
      path : NAVEGACION.admin,
      pathMatch: 'full',
      component: AdminComponent,
      //canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_4",
            "ROLE_5",
            "ROLE_7",
            "ROLE_8"
         ]
      } 
   },
   {
      path: NAVEGACION.admin_consulta ,
      pathMatch: 'full',
      component: AdminConsultaComponent
   },
   {
      path: NAVEGACION.admin_public ,
      pathMatch: 'full',
      component: AdminCluesPublicComponent
   },
   {
      path : NAVEGACION.fases,
      pathMatch: 'full',
      component: FasesComponent,
      canActivate: [AutenticacionGuardGuard],
      data: {
         roles: [
            "ROLE_4",
            "ROLE_5"
         ]
      } 
   },
   {
      path: NAVEGACION.seguimientoSitActual,
      pathMatch: 'full',
      canActivate: [AutenticacionGuardGuard],
      component: SegSitActualComponent,
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.planTrabajo,
      pathMatch: 'full',
      canActivate: [AutenticacionGuardGuard],
      component: PlanTrabajoComponent,
      data: {
         roles: [
            "ROLE_8",
            "ROLE_17",
            "ROLE_18",
            "ROLE_19",
            "ROLE_20",
            "ROLE_21",
            "ROLE_22",
            "ROLE_23",
            "ROLE_24",
            "ROLE_25",
            "ROLE_26",
            "ROLE_27",
            "ROLE_28",
            "ROLE_29",
            "ROLE_30",
            "ROLE_31",
            "ROLE_32",
            "ROLE_61",
            "ROLE_33"
         ]
      }
   },
   {
      path: NAVEGACION.accesoExternoAvance,
      pathMatch: 'full',
      component: AccesoExternoAvanceComponent
   },
   {
      path: NAVEGACION.unidadesPorConfirmar,
      pathMatch: 'full',
      component: UnidadesPorConfirmarDetalleComponent    
   },
   {
      path: '',
      pathMatch: 'full',
      redirectTo: NAVEGACION.login
   },
   {
      path: '**',
      redirectTo: NAVEGACION.login
   },
   

];
