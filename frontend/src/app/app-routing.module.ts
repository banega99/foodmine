import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
// import { TestPageComponent } from './components/pages/test-page/test-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { UserOrdersComponent } from './components/pages/user-orders/user-orders.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'food/:id', component:FoodPageComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'cart-page', component:CartPageComponent},
  // {path: 'test-page', component:TestPageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'checkout', component:CheckoutPageComponent, canActivate: [AuthGuard]},
  {path: 'payments', component:PaymentPageComponent, canActivate: [AuthGuard]},
  {path: 'track/:id', component:OrderTrackPageComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component:UserOrdersComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component:ProfilePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
