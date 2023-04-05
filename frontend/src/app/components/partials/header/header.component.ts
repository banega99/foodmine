import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity$ = this.cartService.cartSubject.pipe(map((data) => {return data.totalCount}))
  // userLogin!: boolean
  user!:User

  constructor(private cartService: CartService, private userService: UserService) {
    // cartService.getCartObservable().subscribe((newCart) => {
    //   this.cartQuantity = newCart.totalCount;
    // })
    // this.userService.userLogin.subscribe(login => this.userLogin = login);
    this.userService.userObservable.subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    console.log(this.cartQuantity$);
    
  }

  logout(){
    this.userService.logout()
  }

  get isAuth(){
    return this.user.id
  }

}
