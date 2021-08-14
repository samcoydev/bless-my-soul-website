import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = environment.apiUrl + '/cart';

  private cartItemsUpdatedSource = new Subject<string>();
  cartItemsUpdated$ = this.cartItemsUpdatedSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  announceCartItemsUpdated(message: string): void {
    console.log(message);
    this.cartItemsUpdatedSource.next(message);
  }

  getCart(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(this.url + '/' + `${this.userService.currentUserValue.id}`);
  }

  postCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.httpClient.post<CartItem>(this.url, cartItem).pipe(
      tap((newItem: CartItem) => {
        this.announceCartItemsUpdated('Cart Items updated - New Record');
      }));
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.httpClient.put<CartItem>(this.url + '/' + `${cartItem.id}`, cartItem).pipe(
      tap((newItem: CartItem) => {
        this.announceCartItemsUpdated('Cart Items updated - Updated Record');
      }));
  }

  deleteCartItem(id: number): Observable<CartItem> {
    return this.httpClient.delete<CartItem>(this.url + '/' + `${id}`).pipe(
      tap((newItem: CartItem) => {
        this.announceCartItemsUpdated('Cart Items updated - Deleted Record');
      }));
  }

  convertItemToCartItem(item: Item): CartItem {
    return new CartItem(-1, item, this.userService.currentUserValue, 1);
  }

}
