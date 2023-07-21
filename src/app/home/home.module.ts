import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PrevioComponent } from './previo/previo.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [HomeComponent, PrevioComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class HomeModule { }
