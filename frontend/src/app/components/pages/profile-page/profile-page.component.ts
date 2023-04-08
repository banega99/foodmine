import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  user!: User
  ordersMade: number = 0
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private orderService: OrderService){
    activatedRoute.params.subscribe(params => {
      if(!params.id) return

      userService.getUserProfie(params.id).subscribe(user => {
        this.user = user
        orderService.loggedUserOrders(this.user.id).subscribe(order => this.ordersMade = order.length)
      })
    })
    
  }
}
