import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchased-item',
  templateUrl: './purchased-item.component.html',
  styleUrls: ['./purchased-item.component.css']
})
export class PurchasedItemComponent implements OnInit {
  @Input() item!:number

  constructor() { }

  ngOnInit(): void {
  }

}
