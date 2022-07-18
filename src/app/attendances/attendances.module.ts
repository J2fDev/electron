import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendancesRoutingModule } from './attendances.routing.module';
import { SharedModule } from '../shared/shared.module';
import {AttendancesComponent} from "./components/attendances/attendances.component";

@NgModule({
  declarations: [
    AttendancesComponent
  ],
  imports: [
    CommonModule,
    AttendancesRoutingModule,
    SharedModule
  ]
})
export class AttendancesModule { }
