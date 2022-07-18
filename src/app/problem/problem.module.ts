import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemRoutingModule } from './problem.routing.module';
import { SharedModule } from '../shared/shared.module';
import {ProblemComponent} from "./components/problem/problem.component";

@NgModule({
  declarations: [
    ProblemComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
    SharedModule
  ]
})
export class ProblemModule { }
