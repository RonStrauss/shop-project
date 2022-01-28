import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { customValidators } from 'src/app/services/custom-validators.service';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrls: ['./purchase-status.component.css'],
})
export class PurchaseStatusComponent implements OnInit {
  // TODO change cities to GET from localhost/lists
  cities = ['Jerusalem', 'Tel-Aviv', 'Haifa'];

  today = new Date()

  order!: FormGroup;
  search!: FormGroup;

  valChanges!:Subscription

  constructor(public _fb: FormBuilder, private _validators:customValidators, public _cart:CartService, public _auth:AuthService) {}

  ngOnInit(): void {
    this.search = this._fb.group({query:[]});

    this.order = this._fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      date: [, [Validators.required], [this._validators.isShippingDateValid]],
      lastFourCardDigits:['',[Validators.required,Validators.pattern(this._validators.creditCardRegex)]]
    });
  }

  ngOnDestroy(): void {}

  getDateErrorMessage(){
    return this.order.get('shipping')?.hasError('required') ? 'Please choose a shipping date' : 'That date is unavailable, please choose a different one instead'
  }
}
