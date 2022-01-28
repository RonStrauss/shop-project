import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchaseStatusComponent } from './components/purchase-status/purchase-status.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

//TODO activate loggedinGuard

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'login', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'cart',
    component: ShopMainComponent,
    //  canActivate:[IsLoggedInGuard],
  },
  { path: 'purchase', component: PurchaseStatusComponent },
  {path:'receipt', component:ReceiptComponent},

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
