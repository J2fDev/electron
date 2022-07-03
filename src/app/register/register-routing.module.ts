import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterScreenComponent} from "./components/register-screen/register-screen.component";
import {RegisterSuccessComponent} from "./components/register-success/register-success.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterScreenComponent
  },
  {
    path: 'sucess',
    component: RegisterSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
