import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../../shop-main/product';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
  styleUrls: ['./grid-product.component.css'],
})
export class GridProductComponent implements OnInit {
  @Input() product!: Product;

  quantity!: FormGroup;

  valueChanged = false;

  constructor(private _formBuilder: FormBuilder, public _auth: AuthService) {}

  ngOnInit(): void {
    this.quantity = this._formBuilder.group({
      number: [0, [Validators.max(50), Validators.min(0)]],
    });
    this.quantity.valueChanges.subscribe((val) => {
      if (this._auth.user) {
        if (this._auth.user.carts[0]?.items.length){
          const itemInCart = this._auth.user.carts[0].items.find(itm=>itm.productID == this.product._id)
          if (itemInCart){

            this.valueChanged = val.number != itemInCart.quantity;}
          } else {
            this.valueChanged = Boolean(val.number)
            
          }
          }
      });
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
}
