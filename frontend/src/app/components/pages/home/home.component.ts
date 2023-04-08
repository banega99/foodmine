import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = []

  foodTerm!: string 

  counter = 0

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let foodsObservable: Observable<Food[]> 
    this.activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm)
      else if(params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag)
      else
        foodsObservable = this.foodService.getAll()

        foodsObservable.subscribe(serverFoods => this.foods = serverFoods)  
    })
  }

  

  getOutputSearch(selected: string){
    if(selected == '') {
      this.foodService.getAll().subscribe(food => this.foods = food);
    }
    
    this.foodService.getFoodByName(selected).subscribe(food =>{
      this.foods = food
    })
  }

}
