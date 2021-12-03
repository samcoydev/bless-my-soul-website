import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];
  itemsInCart: CartItem[] = [];
  categories: Category[] = [];
  categoryToSortBy!: Category;

  items$: Observable<Item[]> = new Observable;
  filter: FormControl = new FormControl('');
  
  itemListSubscription = new Subscription;
  cartItemListSubscription = new Subscription;

  isLoading = false;
  isSessionAuthed = false;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private userService: UserService,
    private categoryService: CategoryService,
    ) {
    this.items$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)));
   }

  ngOnInit(): void {
    this.isSessionAuthed = this.userService.isSessionAuthenticated();
    this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(message => {
      this.getItems();
    });

    this.getItems();
    this.getCategories();

    if (this.isSessionAuthed) {
      this.cartItemListSubscription = this.cartService.cartItemsUpdated$.subscribe(message => {
        this.getCart();
      });

      this.getCart();
    }
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

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response;
      })
  }

  checkIfItemIsInCart(item: Item): boolean {
    let wasItemFound = false;
    this.itemsInCart.forEach(cartItem => {
      if (cartItem.item == item)
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

  sortByCategory(): void {
    this.itemService.getItemByCategory(this.categoryToSortBy).subscribe(response => {
      this.items = response;
    })
  }

  search(text: string): Item[] {
    return this.items.filter(item => {
      const term = text.toLowerCase();
      return item.name.toLowerCase().includes(term)
    });
  }
}
