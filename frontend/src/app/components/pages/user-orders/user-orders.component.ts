import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  
  orders!: any
  visible = false
  name!: string
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, userService: UserService) {
    activatedRoute.params.subscribe(params => {
      if(!params.id) return
      this.name = userService.currentUser.name
      orderService.loggedUserOrders(params.id).subscribe(orders => {
        if(orders.length == 0)return
        this.orders = orders
        this.visible = true
    })
    })
  }
}
