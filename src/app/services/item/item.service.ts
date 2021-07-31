import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = environment.apiUrl + '/item';

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get<Item[]>(this.url);
  }

  getItemByID(id: number) {
    return this.httpClient.get<Item>(this.url + '/' + `${id}`);
  }

  postItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.url, item).pipe(
      tap((newItem: Item) => console.log(`Posted Item: ${newItem.id}`)),
      catchError(this.handleError<Item>('postItem'))
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.httpClient.put<Item>(this.url + '/' + `${item.id}`, item).pipe(
      tap((updatedItem: Item) => console.log(`Updated Item: ${updatedItem.id}`)),
      catchError(this.handleError<Item>('updateItem'))
    );
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>(this.url + '/' + `${id}`).pipe(
      tap(_ => console.log(`Deleted Item: ${id}`)),
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
