import { Product } from "../shop-main/product";

export interface CartItem{
    productID:Product,
    quantity:number,
    _id:string
}