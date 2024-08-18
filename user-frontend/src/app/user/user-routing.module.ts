import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MasterComponent } from './master/master.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

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
      {
        path:'product-details',
        component:ProductDetailsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
