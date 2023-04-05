import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {

  order!: Order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(params => {
      if(!params.id) return

      orderService.trackOrderById(params.id).subscribe(order => this.order =order)
    })
  
  }

  ngOnInit(): void {
    console.log(this.order)
  }

}
