import { Injectable } from '@angular/core';
import { CartItem } from '../components/shop-cart/cart-item';
import { AuthService } from './auth.service';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  // TODO fix types and connect cart to product update

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
        // @ts-ignore: Unreachable code error
        this.cartItems = this._auth.user.carts[0].items.map((item) => {
            return {
              quantity:item.quantity,
              productID: this._shop.products.find((prd) => prd._id === item.productID),
              _id:item._id
            };
          }
        );
      }
      [];
    } else {
      alert(data.msg);
    }
  }
}
