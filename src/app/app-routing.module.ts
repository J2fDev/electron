import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {AuthComponent} from "./auth/auth.component";
import {CoreComponent} from "./core/core.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path:  'home',
    component: CoreComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'process',
    component: CoreComponent,
    loadChildren: () => import('./process/process.module').then(m => m.ProcessModule)
  },
  {
    path:  'publication',
    component: CoreComponent,
    loadChildren: () => import('./publications/publications.module').then(m => m.PublicationsModule)
  },
  {
    path:  'attendance',
    component: CoreComponent,
    loadChildren: () => import('./attendances/attendances.module').then(m => m.AttendancesModule)
  },
  {
    path:  'client',
    component: CoreComponent,
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path:  'calendar',
    component: CoreComponent,
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path:  'document',
    component: CoreComponent,
    loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
  },
  {
    path:  'profile',
    component: CoreComponent,
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path:  'help',
    component: CoreComponent,
    loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
  },
  {
    path:  'problem',
    component: CoreComponent,
    loadChildren: () => import('./problem/problem.module').then(m => m.ProblemModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
