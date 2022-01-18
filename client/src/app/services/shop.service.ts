import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../components/shop-main/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  products: Product[] = [];
  categories: string[] = ["Products"];

  currentViewedProducts: Product[]=[];

  categoryChanged:EventEmitter<string> = new EventEmitter()

  selectedCategory:string='Products'

  constructor() {}

  async getProducts() {
    const res = await fetch('http://localhost:1000/lists/products-categories');
    const data = await res.json();
    if (!data.err) {
      console.log(data)
      this.products = data;
      this.categories = Array.from(
        new Set(
          data.map((product:Product) => product.categoryID._id)
        )
      );
      console.log(this.categories)
      this.currentViewedProducts = this.products.filter(prd=>prd.categoryID._id===this.categories[0])
    }
  }


}
