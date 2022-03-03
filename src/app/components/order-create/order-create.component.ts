import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OrderType } from 'src/app/helpers/enums/order-type';
import { CartItem } from 'src/app/models/cart-item.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  cartItems: CartItem[] = [];
  notes: string = '';
  subtotal: number = 0;

  isSubmitted = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart()
      .subscribe(response => {
        this.cartItems = response;
        this.getSubtotal();
      });
  }

  getSubtotal(): void {
    this.subtotal = 0;
    this.cartItems.forEach(cartItem => this.subtotal += cartItem.item.price * cartItem.qty);
  }

  createOrder(): void {
    this.isSubmitted = true;
    this.isLoading = true;

    let newOrder: Order = {id: -1, user: this.userService.currentUserValue, cartItems: this.cartItems, notes: this.notes, state: OrderType.Requested};

    this.orderService.postOrder(newOrder)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.isLoading = false;
        }
      })
  }


}
