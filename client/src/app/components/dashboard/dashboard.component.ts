import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardServicesService } from 'src/app/services/dashboard-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public _dashboard: DashboardServicesService,
    public _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._dashboard.getProductsAndOrdersNumber();
  }

  getNotificationMessage(): string {
    if (!this._auth.user) return 'I should never return';
    if (this._auth.user.carts.length)
      return this._auth.user.carts[0]?.orderID
        ? `Your last purchase was on ${new Date(
            this._auth.user.carts[0].orderID.dateMade
          )}`
        : 'Please finish your opened order before opening a new cart 😃';

    return 'Welcome to your first purchase!';
  }

  getPurchaseButtonMessage(): string {
    if (this._auth.user)
      return this._auth.user.carts[0]?.orderID || !this._auth.user.carts.length
        ? 'Start a new purchase'
        : 'Continue your purchase';

    return 'I should never return';
  }
}
