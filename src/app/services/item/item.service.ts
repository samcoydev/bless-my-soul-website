import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    return this.httpClient.get<Item[]>(this.url).pipe(
      tap((items: Item[]) => console.log('Got Items')),
      catchError(this.handleError<Item[]>('getAllItems'))
      );;
  }

  getItemByID(id: number): Observable<Item> {
    return this.httpClient.get<Item>(this.url + '/' + `${id}`).pipe(
      tap((item: Item) => console.log('Got Item')),
      catchError(this.handleError<Item>('getItemByID'))
      );
  }

  postItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.url, item).pipe(
      tap((newItem: Item) => {
        console.log(`Posted Item: ${newItem}`);
        this.announceItemsUpdated('Items updated - New Record');
      }),
      catchError(this.handleError<Item>('postItem'))
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.httpClient.put<Item>(this.url + '/' + `${item.id}`, item).pipe(
      tap((updatedItem: Item) => {
        console.log(`Updated Item: ${updatedItem}`);
        this.announceItemsUpdated('Items updated - Updated Record');
      }),
      catchError(this.handleError<Item>('updateItem'))
    );
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>(this.url + '/' + `${id}`).pipe(
      tap(_ => {
        console.log(`Deleted Item with ID: ${id}`);
        this.announceItemsUpdated('Items updated - Deleted Record');
      }),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  private handleError<T>(operation = 'Operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} Failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
