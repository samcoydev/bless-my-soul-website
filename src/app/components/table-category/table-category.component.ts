import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { startWith, map } from 'rxjs/operators'
import { Category } from 'src/app/models/category.model'
import { CategoryService } from 'src/app/services/category/category.service'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.css']
})
export class TableCategoryComponent implements OnInit {

  categories: Category[] = []
  editedCategory?: Category
  currentCategoryToEdit: FormGroup = new FormGroup({
    name: new FormControl(''),
    sequence: new FormControl(''),
    featuredCategory: new FormControl(false),
    allProducts: new FormControl(false),
  });
  selectedCategoryIds: number[] = []
  editCategoryId: number = -1
  
  categories$: Observable<Category[]> = new Observable
  categoryListSubscription = new Subscription

  filter: FormControl = new FormControl('')
  
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

    /*
  saveChanges(): void {
    let updatedCategories = this.categoryCopies.filter(c => !this.areCategoriesEqual(c));
    let updatedCount = 0

    for(let categoryIndex = 0; categoryIndex < updatedCategories.length; categoryIndex++) {
      this.categoryService.updateCategory(updatedCategories[categoryIndex]).subscribe(data => {
        updatedCount++
        if (updatedCount == updatedCategories.length)
          this.getCategories()
      })
    }
  } */

  deleteSelected(): void {
    let updatedCount = 0

    for(let i = 0; i < this.selectedCategoryIds.length; i++) {
      this.categoryService.deleteCategory(this.selectedCategoryIds[i]).subscribe(data => {
        updatedCount++
        if (updatedCount == this.selectedCategoryIds.length)
          this.getCategories()
      })
    }
  }

  viewCategory(category: Category) {
    this.editCategoryId = category.id

    this.currentCategoryToEdit.value.name = category.name
    this.currentCategoryToEdit.value.sequence = category.sequence
    this.currentCategoryToEdit.value.featuredCategory = category.featuredCategory
    this.currentCategoryToEdit.value.allProducts = category.allProducts
  }

  findCategory(categoryId: number): Category | undefined {
    return this.categories.find(c => c.id == categoryId)
  }

  onSelect(event: any, categoryId: number): void {
    if (event.target.checked) {
      this.selectedCategoryIds.push(categoryId)
    } else {
      this.selectedCategoryIds.splice(categoryId, 1)
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
