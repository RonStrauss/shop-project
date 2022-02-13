import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsUserGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router,private _snackBar: MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._auth.user?.role === 'user') {
      return true;
    } else {
      this._router.navigateByUrl('');
      this._snackBar.open('Please log in', 'Ok', {
        duration: 4000,
      });
      return false;
    }
  }
}
