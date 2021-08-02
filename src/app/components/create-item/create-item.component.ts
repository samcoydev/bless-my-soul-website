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

  item: Item = new Item;

  newItemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    price: new FormControl(0.0),
    description: new FormControl('', Validators.maxLength(500)),
    state: new FormControl(StateType.Draft, Validators.required)
  });

  isSubmitted = false;
  isLoading = false;

  stateLabelMapping = StateTypeLabelMapping;
  states = Object.values(StateType);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.item = new Item;
  }

  get f() { return this.newItemForm.controls; }

  createItem() {
    this.isSubmitted = true;

    if (this.newItemForm.invalid)
      return;

    this.isLoading = true;

    this.itemService.postItem(this.newItemForm.value)
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
