import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemForm!: FormGroup;
  submitted = false;

  item!: Item;
  itemName: string = '';
  itemPrice: number = 0;
  itemDesc: string = '';

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.item = new Item;
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0.0),
      description: new FormControl('', Validators.maxLength(500))
    })
  }

  get f() { return this.itemForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.itemForm.invalid){
      return;
    }
    this.item = this.itemForm.value;

    this.itemService.postItem(this.item)
      .subscribe(error => console.log(error));
  }

}
