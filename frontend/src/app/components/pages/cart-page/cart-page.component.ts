import { AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class CartPageComponent implements OnInit, AfterViewInit {
  cart!: Cart;
  userLogin!: boolean
  constructor(private cartService: CartService, private userService: UserService) {
    userService.userLogin.subscribe(login => this.userLogin = login)
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }
  ngAfterViewInit(): void {
  }
  

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem): void {
    this.cartService.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem:CartItem, quantityInString:string): void {
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.food.id, quantity)
  }

  

  click(add: string, cartItem:CartItem, quantityInString:string): void {
    let quantity = parseInt(quantityInString)
    if(add == 'decrease' && quantity > 1)
      this.cartService.changeQuantity(cartItem.food.id, quantity - 1)
    else if (add == 'decrease' && quantity == 1)
      return
    else
      this.cartService.changeQuantity(cartItem.food.id, quantity + 1)
  }
    
}