import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../auth/components/list/list.component';
import { ManagerProcessComponent } from './manager-process/manager-process.component';
import { WatchProcessComponent } from './watch-process/watch-process.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerProcessComponent
  },
  {
    path: 'watch',
    component: WatchProcessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
