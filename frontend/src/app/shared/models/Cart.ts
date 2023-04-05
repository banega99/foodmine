import { CartItem } from "./CartItem";

export class Cart {
    constructor(){} 
    items: CartItem[] = [];
    totalPrice: number = 0;
    totalCount: number = 0;
}