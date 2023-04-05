import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order();
  checkoutForm!: FormGroup
  constructor(private orderService: OrderService, cartService: CartService, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) {
    const cart = cartService.getCart()
    this.order.items = cart.items
    this.order.totalPrice = cart.totalPrice
  }

  ngOnInit(): void {
    let{name, address} = this.userService.currentUser
    this.checkoutForm = this.fb.group({
      name: [name, [Validators.required]],
      address: [address, [Validators.required]],
    })
  }

  get fc(){
    return this.checkoutForm.controls
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastr.warning('Please fill the inputs', 'Invalid Inputs')
      return
    }

    if(!this.order.addressLatLng){
      this.toastr.warning('Please select your location one the map', 'Location')
    }

    this.order.address = this.checkoutForm.value.address
    this.order.name = this.checkoutForm.value.name

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payments')
      },
      error: (err) => [
        this.toastr.error(err.error, 'Çart')
      ]
    })
  }
}
