import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css'],
})
export class OrderTrackPageComponent implements OnInit {
  order!: Order;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          console.log(params['id']);
          return this.orderService.trackOrderById(params['id']);
        })
      )
      .subscribe({
        next: (order) => {
          this.order = order;
          console.log(this.order);
        },
        error: (err) => console.error(err),
      });
  }

  ngOnInit() {}
}
