import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StateType } from 'src/app/helpers/state';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = environment.apiUrl + '/cart';
  
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private itemService: ItemService,
    ) { }

  getCart(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(this.url + '/' + `${this.userService.userValue.id}`);
  }

  postCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.httpClient.post<CartItem>(this.url, cartItem).pipe(
      tap((newCartItem: CartItem) => {
        console.log(`Posted Item: ${newCartItem}`);
      }),
      catchError(this.handleError<CartItem>('postItem'))
    );
  }

  convertItemToCartItem(item: Item): CartItem {
    console.log("convert ", item);
    return new CartItem(-1, item.id, this.userService.userValue.id, 1);
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
