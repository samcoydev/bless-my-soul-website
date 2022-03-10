import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderTypeLabelMapping } from 'src/app/helpers/enums/order-type';
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'
import { RoleType } from 'src/app/helpers/enums/role-type'
import { CartItem } from 'src/app/models/cart-item.model'
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = []
  
  orderLabelMapping = OrderTypeLabelMapping
  placeHolderTypes = PlaceholderType

  isLoading = false
  isSessionAuthed = false
  viewAllOrders = false

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
    ) { }

   ngOnInit(): void {
    this.checkIfViewingAllOrders()
  }
  
  checkIfViewingAllOrders(): void {
    if (this.router.url === "/all-orders-list" && this.userService.currentUserValue.role === RoleType.Admin) {
      this.viewAllOrders = true
      this.getAllOrders()
    } else {
      this.viewAllOrders = false
      this.getUserOrders()
    }
  }

  getAllOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(response => this.orders = response)
  }

  getUserOrders(): void {
    this.orderService.getOrdersByUserID(this.userService.currentUserValue.id)
      .subscribe(response => this.orders = response)
  }

  getTotal(cartItems: CartItem[]): number {
    let total = 0
    cartItems.forEach(cartItem => total += cartItem.item.price * cartItem.qty)
    return total
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order.id)
      .subscribe(error => {
        this.isLoading = false
        console.log(error)
      });
  }
}
