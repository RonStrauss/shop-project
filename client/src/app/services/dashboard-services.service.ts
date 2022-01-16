import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardServicesService {

  totalProducts = 0
  totalOrders = 0

  constructor() { }

  async getProductsAndOrdersNumber(){
    const res = await fetch('http://localhost:1000/lists/orders-and-products-count')
    const data = await res.json()
    this.totalOrders = data.orders
    this.totalProducts = data.products
  }
  
}
