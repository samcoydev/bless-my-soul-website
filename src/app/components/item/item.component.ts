import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item/item.service';
import { Location } from '@angular/common';
import { StateTypeLabelMapping, StateType } from 'src/app/helpers/state-type';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category.model';
import { UserService } from 'src/app/services/user/user.service'
import { CartService } from 'src/app/services/cart/cart.service'
import { first } from 'rxjs/operators'
import { CartItem } from 'src/app/models/cart-item.model'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fader } from 'src/app/helpers/animations/fade.animation'


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [fader]
})
export class ItemComponent implements OnInit {
  
  category: Category = {id: 0, name: "No Category"}
  @Input() item: Item = {id: -1, name: '', price: 0, description: '', state: StateType.Draft, category: this.category}
  @Input() isItemInCart: boolean = false
  itemsInCart: CartItem[] = [];
  
  isLoading = false
  isSubmitted = false
  isSessionAuthed = false

  stateLabelMapping = StateTypeLabelMapping
  states = Object.values(StateType)
  categories: Category[] = []

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemService: ItemService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    if (routeParams.get('itemId')) {
      this.getItemById(Number(routeParams.get('itemId')))
    }

    this.isSessionAuthed = this.userService.isSessionAuthenticated()
    this.getCategories()
    this.getCart()
  }

  //////////////////
  // Item Methods //
  //////////////////

  getItemById(id: number): void {
    this.itemService.getItemByID(id)
      .subscribe(response => this.item = response)
  }

  updateItem(): void{
    this.isSubmitted = true
    this.isLoading = true
    
    let oldId = this.item.id
    this.item.id = oldId

    this.itemService.updateItem(this.item)
      .subscribe(error => console.log(error))
  }

  deleteItem(): void {
    this.itemService.deleteItem(this.item.id)
      .subscribe(error => this.isLoading = false)
    this.location.back()
  }

  //////////////////////
  // Category Methods //
  //////////////////////

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => this.categories = response)
  }

  //////////////////
  // Cart Methods //
  //////////////////

  addToCart(): void {
    this.isLoading = true
    let convertedItem = this.cartService.convertItemToCartItem(this.item)
    this.cartService.postCartItem(convertedItem).pipe(first())
      .subscribe(response => {
        this.isItemInCart = true
        this.isLoading = false
      })
  }

  /*checkIfItemIsInCart(itemId?: number): boolean {
    let wasItemFound = false
    this.itemsInCart.forEach(cartItem => {
      if (cartItem.item.id == this.item.id)
        wasItemFound = true;
    })
    return wasItemFound;
  } */

  getCart(): void {
    this.cartService.getCart()
      .subscribe(response => this.itemsInCart = response)
  }
}
