import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // async login() {
  //   const res = await fetch('http://localhost:1000/auth/login', {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       email: 'admin@admin.admin',
  //       password: 'adminadmin123',
  //     }),
  //     credentials:"include"
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // }

  async receipt() {
    // const res = await fetch('http://localhost:1000/cart/receipt',{credentials:"include"});
    // console.log(res)
  //   const element = document.createElement('a');
  // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  // element.setAttribute('download', 'receipt.txt');

  // element.style.display = 'none';
  // document.body.appendChild(element);

  // element.click();

  // document.body.removeChild(element);

  
  }
}
