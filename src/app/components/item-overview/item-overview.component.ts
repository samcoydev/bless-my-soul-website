import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { first } from 'rxjs/operators'
import { StateType, StateTypeLabelMapping } from 'src/app/helpers/enums/state-type'
import { Category } from 'src/app/models/category.model'
import { Image } from 'src/app/models/image.model'
import { Item } from 'src/app/models/item.model'
import { CartService } from 'src/app/services/cart/cart.service'
import { ItemService } from 'src/app/services/item/item.service'
import { UserService } from 'src/app/services/user/user.service'
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser'
import { ImageType } from 'src/app/helpers/enums/image-type'
import {BreakpointService} from "../../services/breakpoint/breakpoint.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-item-overview',
  templateUrl: './item-overview.component.html',
  styleUrls: ['./item-overview.component.css']
})
export class ItemOverviewComponent implements OnInit {

  image: Image = {id: 0, name: '', type: ImageType.Catalog, fileExtension: '', url: ''}
  category: Category = {id: 0, name: "No Category", sequence: 0, image: this.image}
  @Input() item: Item = {id: -1, name: '', price: 0, description: '', state: StateType.Draft, image: this.image, category: this.category}
  @Input() isItemInCart: boolean = false

  editMode: Boolean = false
  selectedImage?: File
  previewUrl: any

  itemLoaded = false
  isFileInvalid: Boolean = false
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
    private breakpointService: BreakpointService,
    private sanitizer: DomSanitizer,
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
      .subscribe(response => {
        this.item = response
        this.convertImageToViewableUrl(this.item.image)
        this.itemLoaded = true
      })
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


  getPreviewUrl(): void {
    var reader = new FileReader()
    if (this.selectedImage) {
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (_event) => {
        this.previewUrl = reader.result
      }
    }
  }

  getCategoryName(): string {
    if (this.item.category === undefined || this.item.category === null) { return "All Products" }
    return this.item.category.name
  }

  getCategoryUrl(): string {
    if (this.item.category === undefined || this.item.category === null) { return "/category/list" }
    return "/item/list/" + `${this.item.category.id}`
  }

  convertImageToViewableUrl(image?: Image): void {
    if (image == undefined) { return }
    let objectURL = 'data:image/jpeg;base64,' + image.url
    this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL)
  }

  getIsLargeScreen(): Observable<boolean> {
    return this.breakpointService.getIsLargerScreen()
  }

}
