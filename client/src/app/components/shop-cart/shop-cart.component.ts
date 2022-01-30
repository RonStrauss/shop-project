import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css'],
})
export class ShopCartComponent implements OnInit {
  constructor(public _auth:AuthService, public _shop:ShopService, public _cart:CartService) {}

// TODO change quantity in shop grid products when remove from cart button is clicked

  ngOnInit(): void {
    this._cart.cartItems = []
    if (this._auth.user && this._auth.user.carts[0]?.items.length) {
      // @ts-ignore: Unreachable code error
      this._cart.cartItems = this._auth.user.carts[0].items.map((item) => {
          return {
            quantity:item.quantity,
            productID: this._shop.products.find((prd) => prd._id === item.productID),
            _id:item._id
          };
        }
      );
    }
  }
}
