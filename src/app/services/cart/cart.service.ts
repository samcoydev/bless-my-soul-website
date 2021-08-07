import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = environment.apiUrl + '/cart';

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(this.url);
  }

  postCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.httpClient.post<CartItem>(this.url, cartItem);
  }
  
}
