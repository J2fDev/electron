import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifyComponent } from './components/certify/certify.component';
import { ManagerCourtsComponent } from './components/manager-courts/manager-courts.component';
import {ManagerProfileComponent} from "./components/manager-profile/manager-profile.component";

const routes: Routes = [
  {
    path: '',
    component: ManagerProfileComponent
  },
  {
    path: 'list',
    component: ManagerCourtsComponent
  },
  {
    path: 'certify',
    component: CertifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
