import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart/cart.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  cartItems: CartItem[] = [];
  subtotal: number = 0;

  constructor(
    private cartService: CartService,
    private itemService: ItemService,
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
    
  }


}
