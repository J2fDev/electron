import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerProcessComponent } from './manager-process/manager-process.component';
import { WatchProcessComponent } from './watch-process/watch-process.component';
import { ProcessRoutingModule } from './process.routing.module';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ManagerProcessComponent,
    WatchProcessComponent,
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    SharedModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule
  ]
})
export class ProcessModule { }
