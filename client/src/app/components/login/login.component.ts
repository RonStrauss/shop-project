import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  hide = true

  constructor(public _formBuilder:FormBuilder,
    private _auth: AuthService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  submit(){
    const {email, password} = this.loginForm.value
    this._auth.login({email, password})
  }

}
