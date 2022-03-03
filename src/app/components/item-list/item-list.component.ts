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
import { ActivatedRoute } from '@angular/router'
import { CategoryService } from 'src/app/services/category/category.service'

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
    private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private userService: UserService,
    private categoryService: CategoryService,
    ) {
    this.items$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)))
   }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    this.isSessionAuthed = this.userService.isSessionAuthenticated();

    if (routeParams.get('categoryId')) { this.getCategory(Number(routeParams.get('categoryId')))}
    else {
      this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(message => this.getItems())
      this.getItems()
    }

    if (this.isSessionAuthed) {
      this.cartItemListSubscription = this.cartService.cartItemsUpdated$.subscribe(message => this.getCart())
      this.getCart()
    }
  }

  getItems(): void {
    this.isLoading = true
    this.itemService.getAllItems()
      .subscribe(response => {
        this.items = response
        this.isLoading = false
      })
  }

  getItemsByCategoryId(categoryId: number): void {
    this.itemService.getItemByCategoryId(categoryId)
      .subscribe(response => this.items = response)
  }

  getCategory(categoryId: number): void {
    this.categoryService.getCategoryByID(categoryId).subscribe(category => {
      if (category.allProducts) {
        this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(message => this.getItems())
        this.getItems()
      } else {
        this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(message => this.getItemsByCategoryId(category.id))
        this.getItemsByCategoryId(category.id)
      }
    })
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
