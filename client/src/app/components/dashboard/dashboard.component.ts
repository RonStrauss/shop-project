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
    if (this._auth.user?.role === 'user') {
      if (this._auth.user.carts.length)
        return this._auth.user.carts[0]?.orderID
          ? `Your last purchase was on ${new Date(
              this._auth.user.carts[0].orderID.dateMade
            )}`
          : `Your cart from ${
              this._auth.user && this._auth.user.carts[0]
                ? new Date(this._auth.user?.carts[0]?.createdAt).toLocaleString(
                    'en-IL'
                  )
                : null
            } is waiting for you 😊`;

      return 'Welcome to your first purchase!';
    } else {
      return 'Welcome dear admin overlord!';
    }
  }

  getPurchaseButtonMessage(): string {
    if (this._auth.user?.role === 'user')
      return this._auth.user.carts[0]?.orderID || !this._auth.user.carts.length
        ? 'Start a new purchase'
        : 'Continue your purchase';

    return 'Continue to admin panel';
  }
}
