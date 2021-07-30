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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get<Item[]>(this.url);
  }

  postItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.url, item, this.httpOptions).pipe(
      tap((newItem: Item) => console.log(`Posted Item: ${newItem.id}`)),
      catchError(this.handleError<Item>('postItem'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
