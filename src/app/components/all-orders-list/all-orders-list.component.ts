import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderType, OrderTypeLabelMapping } from 'src/app/helpers/order-type';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-all-orders-list',
  templateUrl: './all-orders-list.component.html',
  styleUrls: ['./all-orders-list.component.css']
})
export class AllOrdersListComponent implements OnInit {

  orders: Order[] = [];
  
  orderListSubscription = new Subscription;

  orderLabelMapping = OrderTypeLabelMapping;
  states = Object.values(OrderType);

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

  updateOrder(order: Order): void {
    this.isLoading = true;
    this.orderService.updateOrder(order)
      .subscribe(error => {
        this.isLoading = false;
        console.log(error);
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