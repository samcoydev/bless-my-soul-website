import { Injectable } from '@angular/core';
import { ITEMS } from 'src/app/helpers/mock-items';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getItems(): Item[] {
    return ITEMS;
  }
}
