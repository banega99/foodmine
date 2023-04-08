import { FoodService } from "src/app/services/food.service";
import { Food } from "src/app/shared/models/Food";

export {};

declare global {
  interface Window {
    counter: number
    foodService: FoodService
    foods: Food[]
  }
}
