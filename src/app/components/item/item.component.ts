import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';
import { Location } from '@angular/common';
import { StateTypeLabelMapping, StateType } from 'src/app/helpers/state';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  stateLabelMapping = StateTypeLabelMapping;
  states = Object.values(StateType);

  itemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0.0),
    description: new FormControl('', Validators.maxLength(500)),
    state: new FormControl(StateType.Draft, Validators.required)
  });
  item = new Item();
  submitted = false;

  constructor(
    private itemService: ItemService, 
    private location: Location,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = Number(routeParams.get('itemId'));

    this.getItem(itemIdFromRoute);
  }

  getItem(id: number) {
    this.itemService.getItemByID(id)
      .subscribe(response => {
        this.item = response;
        this.setFormValues();
      });
  }

  setFormValues(): void {
    this.itemForm.controls["name"].setValue(this.item.name);
    this.itemForm.controls["price"].setValue(this.item.price);
    this.itemForm.controls["description"].setValue(this.item.description);
    this.itemForm.controls["state"].setValue(this.item.state);
  }

  updateItem(): void{
    this.submitted = true;
    if (this.itemForm.invalid)
      return;
    
    let oldId = this.item.id;
    this.item = this.itemForm.value;
    this.item.id = oldId;

    this.itemService.updateItem(this.item)
      .subscribe(error => console.log(error));
  }

  deleteItem(): void {
    this.itemService.deleteItem(this.item.id)
      .subscribe(error => console.log(error));
    this.location.back();
  }

}
