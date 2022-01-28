import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';

@Component({
  selector: 'app-purchased-item',
  templateUrl: './purchased-item.component.html',
  styleUrls: ['./purchased-item.component.css']
})
export class PurchasedItemComponent implements OnInit {
  @Input() item!:CartItem
  @Input() query:string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
