import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {

  

  id = this.activatedRoute.snapshot.params['id'];

  order!:Order

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { 
    console.log(this.id)
    this.orderService.trackOrderById(this.id).subscribe({
      next: (order) => {
        this.order = order
      },
      error: (err) => console.log(err)}
    )
  
  }

  ngOnInit(){
    
  }

}
