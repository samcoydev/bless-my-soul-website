import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiUrl + '/order';

  private ordersUpdatedSource = new Subject<string>();
  ordersUpdated$ = this.ordersUpdatedSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  announceOrdersUpdated(message: string): void {
    console.log(message);
    this.ordersUpdatedSource.next(message);
  }

  // CRUD //

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url);
  }

  getOrderByID(id: number): Observable<Order> {
    return this.httpClient.get<Order>(this.url + '/' + `${id}`);
  }

  getOrdersByUserID(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url + '/user/' + `${id}`);
  }

  postOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.url, order).pipe(
      tap((newOrder: Order) => {
        this.announceOrdersUpdated('Orders updated - New Record');
      }));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.url + '/' + `${order.id}`, order).pipe(
      tap((updatedOrder: Order) => {
        this.announceOrdersUpdated('Orders updated - Updated Record');
      }));
  }

  deleteOrder(id: number): Observable<Order> {
    return this.httpClient.delete<Order>(this.url + '/' + `${id}`).pipe(
      tap((updatedOrder: Order) => {
        this.announceOrdersUpdated('Orders updated - Deleted Record');
      }));
  }
  
}
