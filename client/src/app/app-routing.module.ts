import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', },
  {path:'login', component:DashboardComponent},
  {path:'register', component:RegisterComponent},
  {path:'cart', component:ShopMainComponent,
  //  canActivate:[IsLoggedInGuard]
  },
  {path:"**", redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
