import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageType } from 'src/app/helpers/enums/image-type'
import { StateType } from 'src/app/helpers/enums/state-type';
import { CartItem } from 'src/app/models/cart-item.model';
import { Item } from 'src/app/models/item.model';
import { Image } from 'src/app/models/image.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  
  @Input() cartItem!: CartItem;
  image: Image = {id: 0, name: '', type: ImageType.Catalog, fileExtension: '', url: ''}
  item: Item = {id: -1, name: '', price: -1, description: "", state: StateType.Draft, image: this.image, category: {id: 0, name: "No Category", sequence: 0, image: this.image}}

  isLoading = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.item = this.cartItem.item;
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

}
