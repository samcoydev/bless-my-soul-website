import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item/item.service';
import { Location } from '@angular/common';
import { StateTypeLabelMapping, StateType } from 'src/app/helpers/enums/state-type';
import { Category } from 'src/app/models/category.model';
import { UserService } from 'src/app/services/user/user.service'
import { CartService } from 'src/app/services/cart/cart.service'
import { first } from 'rxjs/operators'
import { fader } from 'src/app/helpers/animations/fade.animation'
import { ImageType } from 'src/app/helpers/enums/image-type'
import { Image } from 'src/app/models/image.model'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [fader]
})
export class ItemComponent implements OnInit {
  
  image: Image = {id: 0, name: '', type: ImageType.Catalog, url: ''}
  category: Category = {id: 0, name: "No Category", sequence: 0, image: this.image}
  @Input() item: Item = {id: -1, name: '', price: 0, description: '', state: StateType.Draft, image: this.image, category: this.category}
  @Input() isItemInCart: boolean = false
  
  isLoading = false
  isSubmitted = false
  isSessionAuthed = false

  stateLabelMapping = StateTypeLabelMapping
  states = Object.values(StateType)

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemService: ItemService,
    private cartService: CartService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    if (routeParams.get('itemId'))
      this.getItemById(Number(routeParams.get('itemId')))

    this.isSessionAuthed = this.userService.isSessionAuthenticated()
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
}
