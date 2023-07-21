import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { CuestionarioEstaticoModule } from './cuestionario-estatico/cuestionario-estatico.module';
import { ContenedorCuestionarioModule } from './contenedor-cuestionario/contenedor-cuestionario.module';
import { CuestionarioDinamicoModule } from './cuestionario-dinamico/cuestionario-dinamico.module';
import { ArchivosModule } from './archivos/archivos.module';
import { AdminModule } from './admin/admin.module';
import { AdminPublicModule } from './admin-public/admin.module';
import { AdminConsultaModule } from './admin-consultas/admin-consulta.module';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { AppPublicComponent } from './app-public/app-public.component';
import { SituacionActualModule } from './situacion-actual/situacion-actual.module';
import {SeleccionModule} from './seleccion/seleccion.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { JwtInterceptorHeader } from './shared/interceptor/jwt.interceptor.header';

@NgModule({
  declarations: [
    AppComponent,
    AppPublicComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    SharedModule,
    AutenticacionModule,
    HomeModule,
    CuestionarioEstaticoModule,
    ContenedorCuestionarioModule,
    CuestionarioDinamicoModule,
    ArchivosModule,
    AdminConsultaModule,
    AdminModule,
    AdminPublicModule,
    BackButtonDisableModule.forRoot(),
    AdminPublicModule,
    SituacionActualModule,
    SeleccionModule,
    SeguimientoModule,
    BackButtonDisableModule.forRoot(),
    MatSnackBarModule,
  ],
  //providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorHeader,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
