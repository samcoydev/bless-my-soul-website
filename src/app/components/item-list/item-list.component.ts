import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item.model';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UserService } from 'src/app/services/user/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fader, zoom } from 'src/app/helpers/animations/fade.animation'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  animations: [fader, zoom],
})
export class ItemListComponent implements OnInit {

  items: Item[] = []
  itemsInCart: CartItem[] = []
  filter: FormControl = new FormControl('')
  
  isLoading = false
  isSessionAuthed = false

  items$: Observable<Item[]> = new Observable
  itemListSubscription = new Subscription
  cartItemListSubscription = new Subscription

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private userService: UserService,
    ) {
    this.items$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)))
   }

  ngOnInit(): void {
    this.isSessionAuthed = this.userService.isSessionAuthenticated();
    this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(message => this.getItems())
    this.getItems()

    if (this.isSessionAuthed) {
      this.cartItemListSubscription = this.cartService.cartItemsUpdated$.subscribe(message => this.getCart())
      this.getCart()
    }
  }

  getItems(): void {
    this.itemService.getAllItems()
      .subscribe(response => this.items = response)
  }

  getCart(): void {
    this.cartService.getCart()
      .subscribe(response => {
        this.itemsInCart = response
      })
  }

  checkIfItemIsInCart(item: Item): boolean {
    if (this.itemsInCart.find(el => el.item.id == item.id)) return true
    return false
  }

  addToCart(item: Item): void {
    this.isLoading = true
    let convertedItem = this.cartService.convertItemToCartItem(item)
    this.cartService.postCartItem(convertedItem).pipe(first())
      .subscribe(response => {
          console.log(response)
          this.isLoading = false
    })
  }

  search(text: string): Item[] {
    const term = text.toLowerCase()
    return this.items.filter(item => {
      return item.name.toLowerCase().includes(term)
    })
  }
}
