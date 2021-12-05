import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  userOrders: Order[] = [];
  
  orderListSubscription = new Subscription;
  orderLabelMapping = OrderTypeLabelMapping;

  isLoading = false;
  isSessionAuthed = false;
  viewAllOrders = false;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
    ) { }

   ngOnInit(): void {
    this.checkIfViewingAllOrders()
    
    this.orderListSubscription = this.orderService.ordersUpdated$.subscribe(message => {
      this.getOrders();
    });

    // NOTE (Sam): Why am I running this twice?
    this.getOrders();
  }
  
  checkIfViewingAllOrders(): void {
    if (this.router.url === "/all-orders-list") {
      this.viewAllOrders = true;
    } else {
      this.viewAllOrders = false;
    }
  }

  getOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(response => {
        this.orders = response;
        this.userOrders = this.orders.filter(order => order.user.id == this.userService.currentUserValue.id)
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
