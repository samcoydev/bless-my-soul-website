import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Image } from 'src/app/models/image.model'
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageService } from 'src/app/services/image/image.service'
import { fader, slideDown } from 'src/app/helpers/animations/fade.animation'
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  animations: [fader, slideDown]
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []
  isLoading = false
  isSessionAuthed = false

  categories$: Observable<Category[]> = new Observable
  categoryListSubscription = new Subscription

  filter: UntypedFormControl = new UntypedFormControl('')
  placeHolderTypes = PlaceholderType
  
  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService
    ) {
    this.categories$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)))
   }

  ngOnInit(): void {
    this.categoryListSubscription = this.categoryService.categoriesUpdated$.subscribe(this.getCategories);

    this.getCategories()
  }

  getImageUrl(image?: Image) {
    return this.imageService.convertImageToViewableUrl(image)
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response.sort((a, b) => a.sequence - b.sequence)
      })
  }

  search(text: string): Category[] {
    return this.categories.filter(category => {
      const term = text.toLowerCase()
      return category.name.toLowerCase().includes(term)
    })
  }
}
