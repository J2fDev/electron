import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents.routing.module';
import { SharedModule } from '../shared/shared.module';
import {DocumentsComponent} from "./components/documents/documents.component";

@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule
  ]
})
export class DocumentsModule { }
