import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ORDER_CREATE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL,
  ORDER_TRACK_URL,
  USER_ORDERS_URL,
} from '../shared/constants/urls';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private userService: UserService) {}

  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order, {
      headers: this.createHeaders(),
    });
  }

  newOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(
      ORDER_NEW_FOR_CURRENT_USER_URL + this.userService.currentUser.id,
      {
        headers: this.createHeaders(),
      }
    );
  }

  pay(order: Order): Observable<String> {
    return this.http.post<String>(ORDER_PAY_URL, order, {
      headers: this.createHeaders(),
    });
  }

  trackOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL + id, {
      headers: this.createHeaders(),
    });
  }

  loggedUserOrders(id: string): Observable<Order[]> {
    this.createHeaders();
    return this.http.get<Order[]>(USER_ORDERS_URL + id, {
      headers: this.createHeaders(),
    });
  }

  createHeaders(): HttpHeaders {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.userService.currentUser.token}`
    );
    return headers;
  }
}
