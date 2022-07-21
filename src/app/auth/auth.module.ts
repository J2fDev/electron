import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {ForgotpassComponent} from "./components/forgotpass/forgotpass.component";
import {ResetpassComponent} from "./components/resetpass/resetpass.component";
import {CertifyComponent} from "./components/certify/certify.component";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {ConfirmInstallDialogComponent} from "./dialog/confirm-install-dialog/confirm-install-dialog.component";
import {ConfirmPinDialogComponent} from "./dialog/confirm-pin-dialog/confirm-pin-dialog.component";
import {InstallCertifyDialogComponent} from "./dialog/install-certify-dialog/install-certify-dialog.component";
import {RegisterPinDialogComponent} from "./dialog/register-pin-dialog/register-pin-dialog.component";
import {WithoutCertifyDialogComponent} from "./dialog/without-certify-dialog/without-certify-dialog.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {NgxMaskModule} from "ngx-mask";
import { ListComponent } from './components/list/list.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {CadcertiComponent} from "./components/cadcerti/cadcerti.component";
import {BackiconComponent} from "./components/backicon/backicon.component";

@NgModule({
  declarations: [
    LoginComponent,
    ForgotpassComponent,
    ResetpassComponent,
    CertifyComponent,
    CadcertiComponent,
    BackiconComponent,
    AuthComponent,
    ConfirmInstallDialogComponent,
    ConfirmPinDialogComponent,
    InstallCertifyDialogComponent,
    RegisterPinDialogComponent,
    WithoutCertifyDialogComponent,
    ListComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    NgxMaskModule.forChild(),
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [

  ],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule { }
