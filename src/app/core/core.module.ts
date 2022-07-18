import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./services/local-storage.service";
import {ChargebeeService} from "./services/chargebee.service";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CoreComponent} from "./core.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginService} from "./services/login.service";
import {PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";
import {IbgeService} from "./services/ibge.service";
import { ProcessService } from './services/process.service';
import { CourtsService } from './services/courts.service';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {CertifyService} from "./services/certify.service";
import {MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,

  ],
  exports: [
    CoreComponent,
    RouterModule
  ],
  providers: [
    LocalStorageService,
    ChargebeeService,
    LoginService,
    IbgeService,
    CourtsService,
    ProcessService,
    CertifyService
  ]
})
export class CoreModule { }
