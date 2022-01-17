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

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent, LoginComponent, RegisterComponent, ShopMainComponent, ShopCartComponent, ShopProductsComponent],
  imports: [BrowserModule, AppRoutingModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
