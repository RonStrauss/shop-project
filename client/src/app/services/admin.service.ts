import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  availableCategories:string[] = []

  constructor(public _shop:ShopService) { }

  async getAllCategories(){
    const res = await fetch('http://localhost:1000/lists/categories',{credentials:'include'})
    const data = await res.json()
    if (!data.err){
      this.availableCategories = data
    } else {
      alert(data.msg)
    }
  }

  async editProduct(product:Product,id:string){
    console.log(product);
    const res = await fetch('http://localhost:1000/admin/changeProduct/'+id,{
      method:'put',
      credentials:'include',
      body:JSON.stringify({payload:{...product}}),
      headers:{"content-type":"application/json"}
    })
    const data = await res.json()
    if (!data.err){
     this._shop.setProducts(data)
    } else {
      alert(data.msg)
    }
  }


  async addNewProduct(product:Product){
    const res = await fetch('http://localhost:1000/admin/newProduct',{
      method:'post',
      credentials:'include',
      body:JSON.stringify({payload:{...product}}),
      headers:{"content-type":"application/json"}
    })
    const data = await res.json()
    if (!data.err){
     this._shop.setProducts(data)
    }
  }

  async deleteProduct(id:string){
    const res = await fetch('http://localhost:1000/admin/'+id,{
      method:'delete',
      credentials:'include',
    })
    const data = await res.json()
    if (!data.err){
     this._shop.setProducts(data)
    } else {alert(data.msg)}
  }

}
