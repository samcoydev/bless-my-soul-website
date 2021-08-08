import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart/cart.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];

  items$: Observable<Item[]> = new Observable;
  filter: FormControl = new FormControl('');
  
  itemListSubscription = new Subscription;
  cartItemListSubscription = new Subscription;

  itemsInCart: CartItem[] = [];

  isLoading = false;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    ) {
    this.items$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)));
   }

  ngOnInit(): void {
    this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(message => {
      this.getItems();
    });

    this.cartItemListSubscription = this.cartService.cartItemsUpdated$.subscribe(message => {
      this.getCart();
    });

    this.getItems();
    this.getCart();
  }

  getItems(): void {
    this.itemService.getAllItems()
      .subscribe(response => {
        this.items = response;
      })
  }

  getCart(): void {
    this.cartService.getCart()
      .subscribe(response => {
        this.itemsInCart = response;
      })
  }

  checkIfItemIsInCart(itemID: number): boolean {
    let wasItemFound = false;
    this.itemsInCart.forEach(cartItem => {
      if (cartItem.itemID == itemID)
        wasItemFound = true;
    })
    
    return wasItemFound;
  }

  addToCart(item: Item): void {
    this.isLoading = true;
    let convertedItem = this.cartService.convertItemToCartItem(item);
    this.cartService.postCartItem(convertedItem).pipe(first())
      .subscribe(response => {
          console.log(response);
          this.isLoading = false;
    })
  }

  search(text: string): Item[] {
    return this.items.filter(item => {
      const term = text.toLowerCase();
      return item.name.toLowerCase().includes(term)
    });
  }
}
