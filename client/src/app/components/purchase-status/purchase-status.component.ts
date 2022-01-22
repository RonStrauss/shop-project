import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrls: ['./purchase-status.component.css']
})
export class PurchaseStatusComponent implements OnInit {

  testArr = [1,2,3,4,5,4,5,6,5,6,5,4,3,5,6,7,5,3,4,6,5,6,7,8,9]

  constructor() { }

  ngOnInit(): void {
  }

}
