import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  orders!: Order[]
  user!: string
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      if(!params.userName) return
      this.user = params.userName
      orderService.loggedUserOrders(params.userName).subscribe(orders => {
        console.log(orders)
        this.orders = orders})
    })
    console.log(this.orders)
  }
}
