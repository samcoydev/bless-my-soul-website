import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Image } from 'src/app/models/image.model'
import { CartService } from 'src/app/services/cart/cart.service';
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit {

  cartItems: CartItem[] = []
  subtotal: number = 0
  
  cartItemListSubscription = new Subscription
  currentUserSubscription = new Subscription

  constructor(
    private cartService: CartService,
    private imageService: ImageService
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

  getImageUrl(image?: Image) {
    return this.imageService.convertImageToViewableUrl(image)
  }

}
