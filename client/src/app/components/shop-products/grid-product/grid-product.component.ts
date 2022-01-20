import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../shop-main/product';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
  styleUrls: ['./grid-product.component.css'],
})
export class GridProductComponent implements OnInit,OnDestroy {
  @Input() product!: Product;

  quantity!: FormGroup;
  quantityOfProduct!:number;

  valChangeSub!:Subscription

  valueChanged = false;

  constructor(private _formBuilder: FormBuilder, public _auth: AuthService, public _cart:CartService) {

  }

  ngOnInit(): void {
    if (this._auth.user ){
      this.quantityOfProduct = Number(this._auth.user.carts[0]?.items.find(prd => prd.productID == this.product._id)?.quantity ?? false)
    }
    this.quantity = this._formBuilder.group({
      number: [this.quantityOfProduct, [Validators.max(50), Validators.min(0)]],
    });
    this.valChangeSub = this.quantity.valueChanges.subscribe((val) => {
      if (this._auth.user) {
        if (this._auth.user.carts[0]?.items.length){
          const itemInCart = this._auth.user.carts[0].items.find(itm=>itm.productID == this.product._id)
          if (itemInCart){
            
            this.valueChanged = val.number != itemInCart.quantity;
          } else {
            this.valueChanged = Boolean(val.number)
            
          }
          console.log(itemInCart)
          }
      }});
  }

  increment() {
    this.quantity
      .get('number')
      ?.setValue(this.quantity.get('number')?.value + 1);
  }

  decrement() {
    this.quantity
      .get('number')
      ?.setValue(this.quantity.get('number')?.value - 1);
  }

  changeProductQuantity(){
    this._cart.addToCart(this.product._id,this.quantity.get('number')?.value)
    
    this.valChangeSub.unsubscribe()
    this.valChangeSub = this.quantity.valueChanges.subscribe((val) => {
      if (this._auth.user) {
        if (this._auth.user.carts[0]?.items.length){
          console.log(this.product._id)
          console.log(this._auth.user.carts[0].items)
          const itemInCart = this._auth.user.carts[0].items.find(itm=>itm.productID == this.product._id)
          if (itemInCart){
            
            this.valueChanged = val.number != itemInCart.quantity;
          } else {
            this.valueChanged = Boolean(val.number)
            
          }
          console.log(itemInCart)
          }
      }})

    this.valueChanged = false
  }

  ngOnDestroy():void{
    this.valChangeSub.unsubscribe()
  }
}
