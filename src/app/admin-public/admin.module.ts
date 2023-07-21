import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminCluesPublicComponent } from './admin-clues/admin-clues.component';

@NgModule({
    declarations: [
      AdminCluesPublicComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      FormsModule
      
    ]
  })
  export class AdminPublicModule { }