import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public _auth:AuthService) { }

  async addToCart(productID:string, quantity:number){
    const res = await fetch(`http://localhost:1000/cart/product/${productID}?quantity=${quantity}`,{
      method:'put',
      credentials:'include'
    })
    const data = await res.json()
    if (!data.err){
      this._auth.user = data
    } else {
      alert(data.msg)
    }
  }
}
