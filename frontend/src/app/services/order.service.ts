import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL, USER_ORDERS_URL } from '../shared/constants/urls';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order)
  }

  newOrderForCurrentUser(): Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL)
  }

  pay(order: Order): Observable<String>{
    return this.http.post<String>(ORDER_PAY_URL, order)
  }

  trackOrderById(id: number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id)
  }

  loggedUserOrders(id: string): Observable<Order[]>{
    return this.http.get<Order[]>(USER_ORDERS_URL + id)
  }
}
