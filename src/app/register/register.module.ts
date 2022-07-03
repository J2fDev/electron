import { NgModule } from '@angular/core';
import {RegisterScreenComponent} from "./components/register-screen/register-screen.component";
import {RegisterSuccessComponent} from "./components/register-success/register-success.component";
import {SharedModule} from "../shared/shared.module";
import {RegisterRoutingModule} from "./register-routing.module";

@NgModule({
  declarations: [
    RegisterScreenComponent,
    RegisterSuccessComponent
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  providers: [

  ]
})
export class RegisterModule { }
