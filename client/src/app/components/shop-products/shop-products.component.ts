import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
})
export class ShopProductsComponent implements OnInit {
  constructor(public _shop: ShopService, public _auth:AuthService) {}

  @Input()hide!:boolean

  ngOnInit(): void {
        this._shop.categoryChanged.subscribe((val) => {
      this._shop.currentViewedProducts = this._shop.products.filter(
        (prd) => val == prd.categoryID._id
      );
      this._shop.selectedCategory = val
    });
  }

  emitNewCategory(event: MatTabChangeEvent) {
    this._shop.categoryChanged.emit(event.tab.textLabel);
  }
}
