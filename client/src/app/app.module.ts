import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './modules/material/material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { ShopProductsComponent } from './components/shop-products/shop-products.component';
import { GridProductComponent, ConfirmDialogAdminComponent } from './components/shop-products/grid-product/grid-product.component';
import { TotalItemPipe } from './pipes/total-item.pipe';
import { PurchaseStatusComponent } from './components/purchase-status/purchase-status.component';
import { PurchasedItemComponent } from './components/purchase-status/purchased-item/purchased-item.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AdminDialogComponent } from './components/admin-dialog/admin-dialog.component';
import { ApiDocsComponent } from './components/api-docs/api-docs.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent, LoginComponent, RegisterComponent, ShopMainComponent, ShopCartComponent, ShopProductsComponent, GridProductComponent, TotalItemPipe, PurchaseStatusComponent, PurchasedItemComponent, HighlightPipe, ReceiptComponent, AdminDialogComponent,ConfirmDialogAdminComponent, ApiDocsComponent],
  imports: [BrowserModule, AppRoutingModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  providers: [{provide:MAT_DATE_LOCALE, useValue:'en-GB'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
