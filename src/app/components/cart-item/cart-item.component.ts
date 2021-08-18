import { Component, Input, OnInit } from '@angular/core';
import { StateType } from 'src/app/helpers/state-type';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart/cart.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  
  @Input() cartItem!: CartItem;
  item = new Item(-1, '', -1, '', StateType.Draft);

  isLoading = false;

  constructor(
    private itemService: ItemService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.item = this.cartItem.item;
  }

  updateCartItem(cartItem: CartItem): void {
    this.isLoading = true;
    if (cartItem.qty < 1) {
      // TODO: Use an "are you sure" pop-up to confirm this.
      this.cartService.deleteCartItem(cartItem.id)
        .subscribe(response => {
          this.isLoading = false;
          console.log("Cart Item deleted");
        });
    } else {
    this.cartService.updateCartItem(cartItem)
      .subscribe(response => {
        this.isLoading = false;
        console.log(response);
      });
    }
  }

}
