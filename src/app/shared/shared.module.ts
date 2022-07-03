import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from "./components/alert/alert.component";
import {AdressFormsComponent} from "./components/adress-forms/adress-forms.component";
import {ListTribunaisComponent} from "./components/list-tribunais/list-tribunais.component";
import {FiltrarTribunaisPipe} from "./pipes/filter.pipe";
import {OrganizePipe} from "./pipes/organize.pipe";
import {NewCertifyComponent} from "./dialogs/new-certify/new-certify.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgxMaskModule} from "ngx-mask";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AlertComponent,
    PageNotFoundComponent,
    WebviewDirective,
    AdressFormsComponent,
    ListTribunaisComponent,
    FiltrarTribunaisPipe,
    OrganizePipe,
    NewCertifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatOptionModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    DragDropModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    AlertComponent,
    AdressFormsComponent,
    ListTribunaisComponent,
    CommonModule,
    MatDividerModule,
    MatTabsModule,
    FormsModule,
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class SharedModule {}
