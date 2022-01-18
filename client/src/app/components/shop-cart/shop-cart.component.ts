import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css'],
})
export class ShopCartComponent implements OnInit {
  constructor(public _auth:AuthService) {}

  ngOnInit(): void {
    console.log(this._auth.user)
  }
}
