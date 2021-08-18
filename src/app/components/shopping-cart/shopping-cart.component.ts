import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart/cart.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  subtotal: number = 0;
  
  cartItemListSubscription = new Subscription;
  currentUserSubscription = new Subscription;

  constructor(
    private cartService: CartService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.cartItemListSubscription = this.cartService.cartItemsUpdated$.subscribe(message => {
      this.getCart()
    });

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

}
