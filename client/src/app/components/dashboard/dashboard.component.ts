import { Component, OnInit } from '@angular/core';
import { DashboardServicesService } from 'src/app/services/dashboard-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _dashboard:DashboardServicesService) {}

  ngOnInit(): void {
      this._dashboard.getProductsAndOrdersNumber()
  }
}
