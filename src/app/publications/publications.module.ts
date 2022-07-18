import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationsRoutingModule } from './publications.routing.module';
import { SharedModule } from '../shared/shared.module';
import {PublicationsComponent} from "./components/publications/publications.component";

@NgModule({
  declarations: [
    PublicationsComponent
  ],
  imports: [
    CommonModule,
    PublicationsRoutingModule,
    SharedModule
  ]
})
export class PublicationsModule { }
