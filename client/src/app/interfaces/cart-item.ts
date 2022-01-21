import { Product } from "./product";

export interface CartItem{
    productID:Product,
    quantity:number,
    _id:string
}