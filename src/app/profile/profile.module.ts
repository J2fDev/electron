import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ManagerProfileComponent} from "./components/manager-profile/manager-profile.component";
import { ManagerCourtsComponent } from './components/manager-courts/manager-courts.component';
import { TwoFacDialogComponent } from './dialogs/two-fac-dialog/two-fac-dialog.component';
import { CertifyComponent } from './components/certify/certify.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";
import { InfoDataComponent } from './components/info-data/info-data.component';
import { PlanDataComponent } from './components/plan-data/plan-data.component';
import { SecurityDataComponent } from './components/security-data/security-data.component';
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    ManagerProfileComponent,
    ManagerCourtsComponent,
    InfoDataComponent,
    PlanDataComponent,
    TwoFacDialogComponent,
    SecurityDataComponent,
    CertifyComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatDialogModule,
    NgxMaskModule.forChild()
  ],
  providers: [

  ]
})
export class ProfileModule { }
