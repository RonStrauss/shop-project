import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup
  hide = true
  subscription!:Subscription

  @ViewChild(MatAccordion) accordion!: MatAccordion;


  constructor(public _formBuilder:FormBuilder,
    private _auth: AuthService,
    private _shop:ShopService
    ) { }

    // TODO accordion closeAll only if (isOpen)

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
    this.subscription=this.loginForm.valueChanges.subscribe(()=>{this.accordion.closeAll()})
  }

  // TODO move getProducts to cart component products.length == 0

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
      this._shop.getProducts()
    }

  submit(){
    const {email, password} = this.loginForm.value
    this._auth.login({email, password}, this.accordion)
  }

}
