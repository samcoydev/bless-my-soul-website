import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { startWith, map } from 'rxjs/operators'
import { Category } from 'src/app/models/category.model'
import { CategoryService } from 'src/app/services/category/category.service'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  categories: Category[] = []
  images: Image[] = []
  editedCategory?: Category
  selectedCategoryIds: number[] = []
  editCategoryId: number = -1
  
  categories$: Observable<Category[]> = new Observable
  categoryListSubscription = new Subscription

  filter: FormControl = new FormControl('')
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
    this.getImages()
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(response => {
        this.images = response
      })
  }

  saveChanges(): void {
    if (!this.editedCategory) { return }
    this.categoryService.updateCategory(this.editedCategory).subscribe(data => {
      this.editedCategory = undefined
      this.getCategories()
    })
  }

  deleteSelected(): void {
    let updatedCount = 0

    for(let i = 0; i < this.selectedCategoryIds.length; i++) {
      this.categoryService.deleteCategory(this.selectedCategoryIds[i]).subscribe(data => {
        this.categories.splice(this.categories.findIndex(c => c.id == this.selectedCategoryIds[i]))
        this.selectedCategoryIds.splice(i, 1)
        updatedCount++
        if (updatedCount == this.selectedCategoryIds.length)
          this.getCategories()
      })
    }
  }

  viewCategory(category: Category) {
    this.editCategoryId = category.id

    this.editedCategory = JSON.parse(JSON.stringify(category))
  }

  findCategory(categoryId: number): Category | undefined {
    return this.categories.find(c => c.id == categoryId)
  }

  onSelect(event: any, categoryId: number): void {
    if (event.target.checked) {
      this.selectedCategoryIds.push(categoryId)
    } else {
      this.selectedCategoryIds.splice(this.selectedCategoryIds.indexOf(categoryId), 1)
    }
  }
  
  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response.sort((a, b) => a.sequence - b.sequence)
      })
  }

  getImageUrl(image?: Image) {
    return this.imageService.convertImageToViewableUrl(image)
  }

  search(text: string): Category[] {
    return this.categories.filter(category => {
      const term = text.toLowerCase()
      return category.name.toLowerCase().includes(term)
    })
  }

}
