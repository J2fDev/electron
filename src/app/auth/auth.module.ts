import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {ForgotpassComponent} from "./components/forgotpass/forgotpass.component";
import {ResetpassComponent} from "./components/resetpass/resetpass.component";
import {CertifyComponent} from "./components/certify/certify.component";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {ConfirmPinDialogComponent} from "./dialog/confirm-pin-dialog/confirm-pin-dialog.component";
import {WithoutCertifyDialogComponent} from "./dialog/without-certify-dialog/without-certify-dialog.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {NgxMaskModule} from "ngx-mask";
import { ListComponent } from './components/list/list.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {CadcertiComponent} from "./components/cadcerti/cadcerti.component";
import {BackiconComponent} from "./components/backicon/backicon.component";
import {CsuDialogComponent} from "./dialog/csu-dialog/csu-dialog.component";

@NgModule({
  declarations: [
    LoginComponent,
    ForgotpassComponent,
    ResetpassComponent,
    CertifyComponent,
    CadcertiComponent,
    BackiconComponent,
    AuthComponent,
    ConfirmPinDialogComponent,
    WithoutCertifyDialogComponent,
    ListComponent,
    CsuDialogComponent
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
