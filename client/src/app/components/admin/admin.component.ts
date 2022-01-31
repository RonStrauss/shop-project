import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public _shop:ShopService) { }

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
