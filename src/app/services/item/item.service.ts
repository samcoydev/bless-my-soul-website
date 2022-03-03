import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/models/item.model';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = environment.apiUrl + '/item';

  private itemsUpdatedSource = new Subject<string>();
  itemsUpdated$ = this.itemsUpdatedSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  announceItemsUpdated(message: string): void {
    console.log(message);
    this.itemsUpdatedSource.next(message);
  }

  // CRUD //

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url);
  }

  getItemByID(id: number): Observable<Item> {
    return this.httpClient.get<Item>(this.url + '/' + `${id}`);
  }

  getItemByCategory(category: Category): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url + '/by-category/' + `${category.id}`);
  }
  
  getItemByCategoryId(categoryId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url + '/by-category/' + `${categoryId}`);
  }

  getFeaturedItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url + '/featured');
  }

  getNewestItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url + '/newest');
  }

  postItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.url, item).pipe(
      tap((newItem: Item) => {
        this.announceItemsUpdated('Items updated - New Record');
      }));
  }

  updateItem(item: Item): Observable<Item> {
    return this.httpClient.put<Item>(this.url + '/' + `${item.id}`, item).pipe(
      tap((updatedItem: Item) => {
        this.announceItemsUpdated('Items updated - Updated Record');
      }));
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>(this.url + '/' + `${id}`).pipe(
      tap((updatedItem: Item) => {
        this.announceItemsUpdated('Items updated - Deleted Record');
      }));
  }
  
}
