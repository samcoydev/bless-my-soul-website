import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../models/item.model";

@Component({
  selector: 'app-mobile-item',
  templateUrl: './mobile-item.component.html',
  styleUrls: ['./mobile-item.component.css']
})
export class MobileItemComponent implements OnInit {

  @Input() item!: Item;

  constructor() {
  }

  ngOnInit(): void {
  }

  addToCart(item: Item): void {
    console.log("Adding item to cart: ", item);
  }

}
