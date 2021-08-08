import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
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

    this.getItems();
  }

  getItems(): void {
    this.itemService.getAllItems()
      .subscribe(response => {
        this.items = response;
      })
  }

  search(text: string): Item[] {
    return this.items.filter(item => {
      const term = text.toLowerCase();
      return item.name.toLowerCase().includes(term)
    });
  }

  addToCart(item: Item): void {
    let convertedItem = this.cartService.convertItemToCartItem(item);
    this.cartService.postCartItem(convertedItem).pipe(first()).subscribe({
      error: error => {
        console.log(error);
      }
    })
  }
}
