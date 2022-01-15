import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  cities:string[] = []

  constructor() {this.getCitiesArray()}

  async getCitiesArray(){
    const res = await fetch('http://localhost:1000/lists/cities')
    const data = await res.json()
    if (!data.err)this.cities = data
  }
}
