import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop-main',
  templateUrl: './shop-main.component.html',
  styleUrls: ['./shop-main.component.css']
})


export class ShopMainComponent implements OnInit {
  hide:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
