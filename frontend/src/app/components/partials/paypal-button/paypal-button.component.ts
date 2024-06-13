import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css'],
})
export class PaypalButtonComponent implements OnInit {
  @Input() order!: Order;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  isLoading: boolean = false; // Add a loading state

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    console.log(this.order.total_price);
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          console.log(this.order.total_price);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.order.total_price,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          this.isLoading = true;
          try {
            const payment = await actions.order.capture();
            this.order.payment_id = payment.id;
            this.orderService.pay(this.order).subscribe({
              next: () => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + this.order.id);
                this.toastr.success('Payment Saved Successfully', 'Success');
              },
              error: (error) => {
                this.toastr.error('Payment Save Failed', 'Error');
                console.error('Payment save error:', error);
              },
            });
          } catch (error) {
            this.toastr.error('Payment Approval Failed', 'Error');
            console.error('Payment approval error:', error);
          } finally {
            this.isLoading = false;
          }
        },

        onError: (err: any) => {
          this.toastr.error('Payment Failed', 'Error');
          console.error('Payment error:', err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
