import { Injectable } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import { Register } from '../interfaces/register';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | undefined ;
  constructor(public _router: Router, private _snackBar: MatSnackBar) {}

  async register(object: Register) {
    const res = await fetch('http://localhost:1000/auth/register', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.text();
    if (data) {
      this._router.navigateByUrl('../');
      this._snackBar.open('Registered Successfully!', 'Yay!', {
        duration: 4000,
      });
    }
  }

  async login(object: Login, expansion:MatAccordion) {
    const res = await fetch('http://localhost:1000/auth/login', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    if (!data.err) {
      this._snackBar.open('Logged in Successfully!', undefined, {
        duration: 2000,
      });
      this.user = data;
    } else {
      expansion.openAll()
    }
  }

  async logout(){
    const res = await fetch('http://localhost:1000/auth/logout', {
      method: 'delete',
      credentials: 'include',
    });
    const data = await res.json();
    this._snackBar.open(data.msg,"Ok")
    this.user = undefined;
    this._router.navigateByUrl('/')
  }
}
