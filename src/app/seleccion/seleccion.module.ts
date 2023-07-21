import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SeleccionComponent} from "./seleccion/seleccion.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [SeleccionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class SeleccionModule { }
