import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  item: Item = {
    id: 0,
    name: "Test Name",
    price: 1.99,
    description: "Test Description",
    state: "Posted"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
