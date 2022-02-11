import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
})
export class ShopProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public _shop: ShopService, public _auth: AuthService) {}

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;
  @Input() hide!: boolean;
  tabGroupIndex = 0;

  ngOnInit(): void {
    if (this._shop.selectedCategory !== 'Products')
      this.tabGroupIndex = this._shop.categories.findIndex(
        (cat) => this._shop.selectedCategory === cat
      );
  }

  ngAfterViewInit(): void {
    this.tabGroup?.selectedTabChange.subscribe((event) => {
      this._shop.currentViewedProducts = this._shop.products.filter(
        (prd) => event.tab.textLabel == prd.categoryID._id
      );
      this._shop.selectedCategory = event.tab.textLabel;
    });
  }

  ngOnDestroy(): void {
    this.tabGroup?.selectedTabChange.unsubscribe();
  }

  // TODO add default image button for add new product
}
