import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { StateType, StateTypeLabelMapping } from 'src/app/helpers/state';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;

  item!: Item;
  itemName: string = '';
  itemPrice: number = 0;
  itemDesc: string = '';

  stateLabelMapping = StateTypeLabelMapping;
  states = Object.values(StateType);

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.item = new Item;
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0.0),
      description: new FormControl('', Validators.maxLength(500)),
      state: new FormControl(StateType.Draft, Validators.required)
    })
  }

  get f() { return this.itemForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    if (this.itemForm.invalid){
      return;
    }
    this.item = this.itemForm.value;

    this.itemService.postItem(this.item)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.isLoading = false;
        }
      })
  }

}
