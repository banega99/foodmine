import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!: Food;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService: CartService, private router: Router, private cartPage: CartPageComponent) {
    this.activatedRoute.params.subscribe(params => {
      if (params.id)
      this.foodService.getFoodById(params.id)
      .subscribe(food => this.food = food);
    })
   }

  ngOnInit(): void {
    // let foodObservable: Observable<Food>
    
    
  }

  addToCart(): void {
    this.cartService.addToCart(this.food)
    this.router.navigateByUrl('/cart-page')
  }

}
