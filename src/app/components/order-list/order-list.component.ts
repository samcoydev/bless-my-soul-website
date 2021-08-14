import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  
  orderListSubscription = new Subscription;

  isLoading = false;
  isSessionAuthed = false;

  constructor(
    private orderService: OrderService
    ) { }

   ngOnInit(): void {
    this.orderListSubscription = this.orderService.ordersUpdated$.subscribe(message => {
      this.getOrders();
    });

    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(response => {
        this.orders = response;
      })
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order.id)
      .subscribe(error => {
        this.isLoading = false;
        console.log(error);
      });
  }
}
