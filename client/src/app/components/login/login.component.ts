import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy,AfterViewInit {
  loginForm!: FormGroup;
  hide = true;
  subscription!: Subscription;

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined

  constructor(
    public _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _shop: ShopService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.subscription = this.loginForm.valueChanges.subscribe(() => {
      this.accordion?.closeAll();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    if(!this._shop.products.length)this._shop.getProducts();
  }

  submit() {
    if (this.accordion)this._auth.login(this.loginForm.value, this.accordion);
  }
}
