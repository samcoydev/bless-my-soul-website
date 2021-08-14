import { Component, Input, OnInit } from '@angular/core';
import { StateType } from 'src/app/helpers/state-type';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  
  @Input() item = new Item(-1, '', -1, '', StateType.Draft);

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

}
