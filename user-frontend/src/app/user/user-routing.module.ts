import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'master/home',
    pathMatch: 'full',
  },
  {
    path: 'master',
    component: MasterComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
