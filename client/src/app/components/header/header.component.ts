import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // shouldAppBarShow: boolean = Math.random() * 1 > 0.2;
  constructor() {}

  ngOnInit(): void {}
}
