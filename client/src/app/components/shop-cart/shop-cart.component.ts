import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';
import { Product } from '../shop-main/product';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css'],
})
export class ShopCartComponent implements OnInit {
  constructor(public _auth:AuthService, public _shop:ShopService) {}

  internalProductList:Product[] = []

  ngOnInit(): void {
    if (this._auth.user && this._auth.user.carts[0]?.items){
      const idArr = this._auth.user.carts[0].items.map(itm=>itm.productID)
      this.internalProductList = this._shop.products.filter(prd=>prd._id.some(idArr))
    } 
  }
}
