import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';
import { AuthService } from './auth.service';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  // TODO connect cart to product update

  constructor(public _auth: AuthService, public _shop: ShopService) {}

  async updateCart(productID: string, quantity: number) {
    const res = await fetch(
      `http://localhost:1000/cart/product/${productID}?quantity=${quantity}`,
      {
        method: 'put',
        credentials: 'include',
      }
    );
    const data = await res.json();
    if (!data.err) {
      this._auth.user = data;
      if (this._auth.user && this._auth.user.carts[0]?.items) {
        
        this.cartItems = this._auth.user.carts[0].items.map((item) => {
            return {
              quantity:item.quantity,
              // weird-ass typescript and its weird-ass rules, .find MAY return undefined so need the typeError part
              productID: (()=>{
                const itm = this._shop.products.find((prd:Product) => prd._id === item.productID)
              if (itm === undefined) throw new TypeError()
              return itm})(),
              _id:item._id
            };
          }
        );
      }
    } else {
      alert(data.msg);
    }
  }

  async emptyCart(){
    const res = await fetch(`http://localhost:1000/cart/empty-cart`, {
        method: 'delete',
        credentials: 'include',
      });
    const data = await res.json()
    if (!data.err){
      this.cartItems = []
      this._auth.user = data
    }
  }
}
