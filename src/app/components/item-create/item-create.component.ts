import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ImageType } from 'src/app/helpers/enums/image-type'
import { StateType, StateTypeLabelMapping } from 'src/app/helpers/enums/state-type';
import { Category } from 'src/app/models/category.model';
import { Image } from 'src/app/models/image.model'
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageService } from 'src/app/services/image/image.service'
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  rawImage?: File;
  image: Image = {id: 0, name: '', type: ImageType.Catalog, fileExtension: '', url: ''}
  category: Category = { id: -1, name: '', sequence: 0, image: this.image};
  newItem: Item = { 
    id: -1, 
    name: '', 
    price: 0.00, 
    description: '', 
    state: StateType.Draft,
    image: this.image,
    category: this.category
  }

  isSubmitted = false
  isLoading = false

  stateLabelMapping = StateTypeLabelMapping
  states = Object.values(StateType)
  categories: Category[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response
        this.newItem.category = response[0]
      })
  }

  setRawImage(image: any): void {
    if (image)
      this.rawImage = image
  }

  createItem(): void {
    this.isSubmitted = true
    this.isLoading = true

    console.log("[CREATE]: ", this.rawImage)

    // First we have to post the new Image
    if (this.rawImage) {
      this.imageService.postImage(this.rawImage, this.image)
        .subscribe(data => {
          console.log("[POST]: ", data)
          this.newItem.image = data
          this.postItem();
        }, error => {
          console.log(error)
        })
    } else {
      this.postItem();
    }
  }

  postItem(): void {
    this.itemService.postItem(this.newItem)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
          this.router.navigateByUrl(returnUrl)
        },
        error: error => {
          console.error(error)
          this.isLoading = false
        }
      })
  }

}
