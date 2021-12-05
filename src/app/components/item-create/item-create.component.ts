import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { StateType, StateTypeLabelMapping } from 'src/app/helpers/state-type';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  catTest: any;
  newItem: Item = {id: -1, name: '', price: 0.00, description: '', state: StateType.Draft, category: {id: 0, name: "lol"}};

  isSubmitted = false;
  isLoading = false;

  stateLabelMapping = StateTypeLabelMapping;
  states = Object.values(StateType);
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }
  
  changeCategory(): void {
    console.log("CATTEST: ", this.catTest)
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(response => {
        this.categories = response;
      })
  }

  createItem(): void {
    this.isSubmitted = true;
    this.isLoading = true;

    this.itemService.postItem(this.newItem)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.error(error)
          this.isLoading = false;
        }
      })
  }

}
