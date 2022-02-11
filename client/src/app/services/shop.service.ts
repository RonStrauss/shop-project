import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  products: Product[] = [];
  categories: string[] = ['Products'];

  currentViewedProducts: Product[] = [];

  selectedCategory: string = 'Products';

  constructor() {}

  async getProducts() {
    const res = await fetch('http://localhost:1000/lists/products-categories');
    const data = await res.json();
    if (!data.err) {
      this.products = data;
      this.categories = Array.from(
        new Set(data.map((product: Product) => product.categoryID._id))
      );
      this.currentViewedProducts = this.products.filter(
        (prd) => prd.categoryID._id === this.categories[0]
      );
      this.selectedCategory = this.categories[0]
    }
  }

  async searchProducts(query: string = '') {
    if (!query) {
      this.currentViewedProducts = this.products.filter(
        (prd) => prd.categoryID._id === this.selectedCategory
      );
    } else {
      const res = await fetch(
        'http://localhost:1000/lists/product-search?query=' + query,
        {
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (!data.err) {
        this.currentViewedProducts = [...data];
      }
    }
  }

  setProducts(data:Product[]){
    this.products = data;
    this.categories = Array.from(
      new Set(data.map((product: Product) => product.categoryID._id))
    );
    this.currentViewedProducts = this.products.filter(
      (prd) => prd.categoryID._id === this.selectedCategory
    );
  }
}
