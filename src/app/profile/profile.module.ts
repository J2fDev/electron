import { NgModule } from '@angular/core';
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ManagerProfileComponent} from "./components/manager-profile/manager-profile.component";
import { ManagerCourtsComponent } from './components/manager-courts/manager-courts.component';
import { TwoFacDialogComponent } from './dialogs/two-fac-dialog/two-fac-dialog.component';
import { CertifyComponent } from './components/certify/certify.component';
import { NgxMaskModule } from 'ngx-mask';
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ProfileComponent,
    ManagerProfileComponent,
    ManagerCourtsComponent,
    TwoFacDialogComponent,
    CertifyComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    MatTabsModule,
    MatDividerModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatStepperModule,
    NgxMaskModule.forChild(),
    MatDialogModule
  ],
  providers: [

  ]
})
export class ProfileModule { }
