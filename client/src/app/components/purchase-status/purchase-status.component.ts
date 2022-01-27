import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { customValidators } from 'src/app/services/custom-validators.service';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrls: ['./purchase-status.component.css'],
})
export class PurchaseStatusComponent implements OnInit {
  cities = ['Jerusalem', 'Tel-Aviv', 'Haifa'];

  order!: FormGroup;

  constructor(public _fb: FormBuilder, private _validators:customValidators) {}

  ngOnInit(): void {
    this.order = this._fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      shipping: [, [Validators.required], [this._validators.isShippingDateValid]],
      creditCard:['',[Validators.required,]]
    });
  }

  ngOnDestroy(): void {}

  testArr = [
    1, 2, 3, 4, 5, 4, 5, 6, 5, 6, 5, 4, 3, 5, 6, 7, 5, 3, 4, 6, 5, 6, 7, 8, 9,
  ];

  getDateErrorMessage(){
    return this.order.get('shipping')?.hasError('required') ? 'Please choose a shipping date' : 'Please choose a date later than yesterday or a different one'
  }
}
