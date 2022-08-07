import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssuranceRoutingModule } from './assurance-routing.module';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    AddComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssuranceRoutingModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class AssuranceModule { }
