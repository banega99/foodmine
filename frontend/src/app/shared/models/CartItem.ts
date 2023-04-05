import { Injectable } from "@angular/core";
import { Food } from "./Food";
import { Tag } from "./Tags";

@Injectable({
    providedIn: "root"
  })


export class CartItem {
    constructor(public food: Food) {}
    quantity: number = 1;
    price: number = this.food.price;
}