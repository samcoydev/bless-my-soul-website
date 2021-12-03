import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  categories$: Observable<Category[]> = new Observable;
  filter: FormControl = new FormControl('');
  
  categoryListSubscription = new Subscription;

  isLoading = false;
  isSessionAuthed = false;

  constructor(
    private categoryService: CategoryService,
    ) {
    this.categories$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)));
   }

  ngOnInit(): void {
    this.categoryListSubscription = this.categoryService.categoriesUpdated$.subscribe(message => {
      this.getCategories();
    });

    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response;
      })
  }

  search(text: string): Category[] {
    return this.categories.filter(category => {
      const term = text.toLowerCase();
      return category.name.toLowerCase().includes(term)
    });
  }
}
