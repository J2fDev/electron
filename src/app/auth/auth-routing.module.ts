import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ForgotpassComponent} from "./components/forgotpass/forgotpass.component";
import {ResetpassComponent} from "./components/resetpass/resetpass.component";
import {CertifyComponent} from "./components/certify/certify.component";
import { ListComponent } from './components/list/list.component';
import { LoginGuardGuard } from '../shared/guards/login-guard.guard';
import {CadcertiComponent} from "./components/cadcerti/cadcerti.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'forgotpass',
    component: ForgotpassComponent
  },
  {
    path: 'resetpass',
    component: ResetpassComponent
  },
  {
    path: 'certify',
    component: CertifyComponent
  },
  {
    path: 'cadcerti',
    component: CadcertiComponent
  },
  {
    path: 'listtribunais',
    component: ListComponent,
    canActivate: [LoginGuardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
