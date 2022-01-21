import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  form!:FormGroup

  constructor(public _auth:AuthService, public _router:Router, public _fb:FormBuilder,public _shop:ShopService) {
    
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      query:['']
    })
    this.form.get('query')?.valueChanges.pipe(debounceTime(500),distinctUntilChanged()).subscribe(q=>this._shop.searchProducts(q))
  }

  handleSearch(){

  }
}
