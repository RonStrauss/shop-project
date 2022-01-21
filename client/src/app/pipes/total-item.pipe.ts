import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalItem'
})
export class TotalItemPipe implements PipeTransform {

  transform(quantity: number, integer: number,decimal:number): string {
    
    
    return `${(integer*quantity) + Math.floor((decimal*quantity)/100)}.${(decimal*quantity)%100}`;
  }

}
