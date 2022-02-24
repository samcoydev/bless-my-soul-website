import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiUrl + '/item/category';

  private categoriesUpdatedSource = new Subject<string>();
  categoriesUpdated$ = this.categoriesUpdatedSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  announceCategoriesUpdated(message: string): void {
    console.log(message);
    this.categoriesUpdatedSource.next(message);
  }

  // CRUD //

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url);
  }

  getCategoryByID(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + '/' + `${id}`);
  }

  getFeaturedCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + '/featured')
  }

  postCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.url, category).pipe(
      tap((newItem: Category) => {
        this.announceCategoriesUpdated('Categories updated - New Record');
      }));
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.url + '/' + `${category.id}`, category).pipe(
      tap((updatedItem: Category) => {
        this.announceCategoriesUpdated('Categories updated - Updated  Record');
      }));
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.url + '/' + `${id}`).pipe(
      tap((updatedItem: Category) => {
        this.announceCategoriesUpdated('Categories updated - Deleted Record');
      }));
  }
  
}
