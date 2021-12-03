import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item/item.service';
import { Location } from '@angular/common';
import { StateTypeLabelMapping, StateType } from 'src/app/helpers/state-type';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  category: Category = {id: 0, name: "No Category"};
  item: Item = {id: -1, name: '', price: 0, description: '', state: StateType.Draft, category: {id: 0, name: "No Category"}};

  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    price: new FormControl(0.0),
    description: new FormControl('', Validators.maxLength(500)),
    category: new FormControl(this.category.name, Validators.required),
    state: new FormControl(StateType.Draft, Validators.required)
  });

  isSubmitted = false;
  isLoading = false;

  stateLabelMapping = StateTypeLabelMapping;
  states = Object.values(StateType);
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemService: ItemService,
    private categoryService: CategoryService,
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = Number(routeParams.get('itemId'));

    this.getItem(itemIdFromRoute);
    this.getCategories;
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response;
      })
  }

  get f() { return this.itemForm.controls; }

  getItem(id: number): void {
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
    this.isSubmitted = true;

    if (this.itemForm.invalid)
      return;

    this.isLoading = true;
    
    let oldId = this.item.id;
    this.item = this.itemForm.value;
    this.item.id = oldId;

    this.itemService.updateItem(this.item)
      .subscribe(error => console.log(error));
  }

  deleteItem(): void {
    this.itemService.deleteItem(this.item.id)
      .subscribe(error => {
        this.isLoading = false;
        console.log(error);
      });
    this.location.back();
  }

}
