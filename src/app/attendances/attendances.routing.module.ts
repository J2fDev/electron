import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttendancesComponent} from "./components/attendances/attendances.component";

const routes: Routes = [
  {
    path: '',
    component: AttendancesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendancesRoutingModule { }
