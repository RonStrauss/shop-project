import { Injectable } from '@angular/core';
import { Category } from '../components/shop-main/category';
import { Product } from '../components/shop-main/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  products: Product[] = [];
  categories: Category[] = [];

  constructor() {}

  async getProducts() {
    const res = await fetch('http://localhost:1000/lists/products-categories');
    const data = await res.json();
    if (!data.err) {
      this.products = data;
      this.categories = Array.from(
        new Set(
          data.map((product: { categoryID: string }) => product.categoryID)
        )
      );
      console.log(this.categories);
    }
  }
}
