import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators'
import { OrderType } from 'src/app/helpers/enums/order-type'
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'
import { CartItem } from 'src/app/models/cart-item.model';
import { Image } from 'src/app/models/image.model'
import { Order } from 'src/app/models/order.model'
import { CartService } from 'src/app/services/cart/cart.service';
import { ImageService } from 'src/app/services/image/image.service'
import { OrderService } from 'src/app/services/order/order.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit {

  cartItems: CartItem[] = []
  subtotal: number = 0
  notes: string = ''
  isLoading: boolean = false
  
  cartItemListSubscription = new Subscription
  currentUserSubscription = new Subscription

  placeHolderTypes = PlaceholderType

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.cartItemListSubscription = this.cartService.cartItemsUpdated$.subscribe(data => this.getCart())

    this.getCart()
  }

  getCart(): void {
    this.cartService.getCart()
      .subscribe(response => {
        this.cartItems = response
        this.getSubtotal()
      })
  }

  getSubtotal(): void {
    this.subtotal = 0
    this.cartItems.forEach(cartItem => this.subtotal += cartItem.item.price * cartItem.qty)
  }

  updateCartItem(cartItem: CartItem): void {
    this.isLoading = true
    if (cartItem.qty < 1) {
      // TODO: Use an "are you sure" pop-up to confirm this.
      this.cartService.deleteCartItem(cartItem.id)
        .subscribe(response => {
          this.isLoading = false
          console.log("Deleting cart item due to quantity being zeroed.")
        })
    } else {
      this.cartService.updateCartItem(cartItem)
        .subscribe(response => this.isLoading = false)
    }
  }

  deleteCartItem(cartItem: CartItem): void {
    this.cartService.deleteCartItem(cartItem.id).subscribe(data => console.log(data))
    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1)
  }

  createOrder(): void {
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
