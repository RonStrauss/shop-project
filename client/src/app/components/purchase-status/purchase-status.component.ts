import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { customValidators } from 'src/app/services/custom-validators.service';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrls: ['./purchase-status.component.css'],
})
export class PurchaseStatusComponent implements OnInit {
  today = new Date();

  order!: FormGroup;
  search!: FormGroup;

  // valChanges!: Subscription;

  constructor(
    public _fb: FormBuilder,
    private _validators: customValidators,
    public _cart: CartService,
    public _auth: AuthService,
    public _lists: ListsService
  ) {}

  //TODO empty searchedCart after pay

  ngOnInit(): void {
    this.search = this._fb.group({ query: [] });

    this.order = this._fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      date: [, [Validators.required], [this._validators.isShippingDateValid]],
      lastFourCardDigits: [
        '',
        [
          Validators.required,
          Validators.pattern(this._validators.creditCardRegex),
        ],
      ],
    });
    this._cart.searchedCartItems = this._cart.cartItems
    this.search.valueChanges.subscribe(val=>{
      if (val.query){

        this._cart.searchedCartItems = this._cart.cartItems.reduce((accum:any[],curr)=>{
          console.log(curr);
          if (curr.productID.name.toLowerCase().includes(val.query.toLowerCase())) {
            accum.unshift(curr)
          }
          else {accum.push(curr)}
          return accum
        },[])
      } else {this._cart.searchedCartItems = this._cart.cartItems}
    })
  }

  ngOnDestroy(): void {}

  getDateErrorMessage() {
    return this.order.get('date')?.hasError('required')
      ? 'Please choose a shipping date'
      : 'That date is unavailable, please choose a different one instead';
  }

  fillAddress() {
    this.order.setValue({
      ...this.order.value,
      city: this._auth.user?.address.city,
      street: this._auth.user?.address.street,
    });
  }
}
