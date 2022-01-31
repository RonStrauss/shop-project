import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardServicesService {
  totalProducts = 0;
  totalOrders = 0;

  constructor(private _auth: AuthService, private _router: Router) {}

  async getProductsAndOrdersNumber() {
    const res = await fetch(
      'http://localhost:1000/lists/orders-and-products-count'
    );
    const data = await res.json();
    this.totalOrders = data.orders;
    this.totalProducts = data.products;
  }

  async openNewCartAndNavigate() {
    if (this._auth.user?.role === 'admin') {
      this._router.navigateByUrl('/admin');
    } else {
      if (
        this._auth.user?.carts?.[0]?.orderID ||
        !this._auth.user?.carts.length
      ) {
        const res = await fetch('http://localhost:1000/cart/new', {
          method: 'put',
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.err) {
          this._auth.user = data;
        } else {
          alert(data.msg);
        }
      } else {
        this._router.navigateByUrl('/cart');
      }
    }
  }
}
