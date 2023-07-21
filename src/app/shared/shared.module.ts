import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HasRoleDirective } from './directive/has-role.directive';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule  } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexLayoutModule } from "@angular/flex-layout";
import { OnlynumberDirective } from './directive/only-number-directive';
import { ValidaInputDirective } from './directive/valida-input.directive';
import { AreaComponent } from './cards/area/area.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { RubroComponent } from './cards/rubro/rubro.component';
import { ModalDialogComponent } from './common-components/modal-dialog/modal-dialog.component';
import { HeaderComponent } from './common-components/header/header.component';
import { CaptchaComponent } from './common-components/captcha/captcha.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { NotFoundComponent } from './common-components/not-found/not-found.component';
import { SubheaderComponent } from './common-components/subheader/subheader.component';
import { InformacionUsuarioAsignacionComponent } from './common-components/informacion-usuario-asignacion/informacion-usuario-asignacion.component';
import { LazyImgDirective } from './directive/lazy-image.directive';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { AumentCeroPipe } from './pipe/aument-cero.pipe';
import { AbreviaturaEstadosPipe } from './pipe/abreviatura-estados.pipe';
import { UpperCaseDirective } from './directive/upper-case.directive';
import { DisabledDirective } from './directive/disabled.directive';
import { HiddenSwitchDirective } from './directive/hidden-switch.directive';
import { FileUploadComponent } from './common-components/file-upload/file-upload.component';
import { FormatoArchivoDirective } from './directive/formato-archivo.directive';

registerLocaleData(es);

@NgModule({
  declarations: [
    ModalDialogComponent,
    HeaderComponent,
    CaptchaComponent,
    HasRoleDirective,
    OnlynumberDirective,
    ValidaInputDirective,
    LazyImgDirective,
    UpperCaseDirective,
    FooterComponent,
    NotFoundComponent,
    SubheaderComponent,
    AreaComponent,
    RubroComponent,
    InformacionUsuarioAsignacionComponent,
    AumentCeroPipe,
    AbreviaturaEstadosPipe,
    FormatoArchivoDirective,
    DisabledDirective,
    HiddenSwitchDirective,
    FileUploadComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    NgbModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCardModule,
    CarouselModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    HasRoleDirective,
    OnlynumberDirective,
    ValidaInputDirective,
    LazyImgDirective,
    UpperCaseDirective,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    NgbModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    CarouselModule,
    MatTableModule,
    MatPaginatorModule,
    ModalDialogComponent,
    HeaderComponent,
    CaptchaComponent,
    SubheaderComponent,
    FooterComponent,
    AreaComponent,
    RubroComponent,
    InformacionUsuarioAsignacionComponent,
    AumentCeroPipe,
    MatSortModule,
    AbreviaturaEstadosPipe,
    FormatoArchivoDirective,
    DisabledDirective,
    HiddenSwitchDirective,
    FileUploadComponent
  ],  
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
 ]  
})
export class SharedModule { }
