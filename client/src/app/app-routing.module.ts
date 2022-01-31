import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchaseStatusComponent } from './components/purchase-status/purchase-status.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

//TODO activate loggedInGuard and adminGuard

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
  { path: 'receipt', component: ReceiptComponent },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate:[IsAdminGuard]
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
