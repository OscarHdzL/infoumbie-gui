import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ControlPrimerAccesoComponent } from './control-primer-acceso/control-primer-acceso.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginComponent, ControlPrimerAccesoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    MatCardModule
  ]
})
export class AutenticacionModule { }
