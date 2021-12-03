import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OrderTypeLabelMapping } from 'src/app/helpers/order-type';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  
  orderListSubscription = new Subscription;
  orderLabelMapping = OrderTypeLabelMapping;

  isLoading = false;
  isSessionAuthed = false;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    ) { }

   ngOnInit(): void {
    this.orderListSubscription = this.orderService.ordersUpdated$.subscribe(message => {
      this.getOrders();
    });

    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrdersByUserID(this.userService.currentUserValue.id)
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
