import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { Item } from 'src/app/models/item.model'
import { StateTypeLabelMapping, StateType } from 'src/app/helpers/enums/state-type';
import { ItemService } from 'src/app/services/item/item.service'
import { FormControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators'
import { Category } from 'src/app/models/category.model'
import { CategoryService } from 'src/app/services/category/category.service'

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {

  items: Item[] = []
  categories: Category[] = []
  editedItem?: Item
  selectedItemIds: number[] = []
  editItemId: number = -1

  items$: Observable<Item[]> = new Observable
  itemListSubscription = new Subscription
  filter: FormControl = new FormControl('')
  states = Object.values(StateType)

  stateLabelMapping = StateTypeLabelMapping

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService) {
    this.items$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text)))
  }

  ngOnInit(): void {
    this.itemListSubscription = this.itemService.itemsUpdated$.subscribe(this.getItems);
    this.getItems()
    this.getCategories()
  }

  getItems(): void {
    this.itemService.getAllItems()
      .subscribe(data => this.items = data)
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(data => this.categories = data)
  }

  viewItem(item: Item) {
    this.editItemId = item.id
    this.editedItem = JSON.parse(JSON.stringify(item))
  }

  onSelect(event: any, itemId: number): void {
    if (event.target.checked) {
      this.selectedItemIds.push(itemId)
    } else {
      this.selectedItemIds.splice(this.selectedItemIds.indexOf(itemId), 1)
    }
  }

  saveChanges(): void {
    if (!this.editedItem) { return }
    console.log("ITEM: ", this.editedItem)
    this.itemService.updateItem(this.editedItem).subscribe(data => {
      this.editedItem = undefined
      this.getItems()
    })
  }

  deleteItem(itemId: number): void {
    if (this.selectedItemIds.indexOf(itemId))
      this.selectedItemIds.splice(this.selectedItemIds.indexOf(itemId), 1)

    this.itemService.deleteItem(itemId).subscribe(data => {
      this.editedItem = undefined
      this.getItems()
    })
  }

  deleteSelected(): void {
    let updatedCount = 0

    for(let i = 0; i < this.selectedItemIds.length; i++) {
      this.itemService.deleteItem(this.selectedItemIds[i]).subscribe(data => {
        updatedCount++
        if (updatedCount == this.selectedItemIds.length)
          this.getItems()

        
        if (this.selectedItemIds.indexOf(i))
          this.selectedItemIds.splice(this.selectedItemIds.indexOf(i), 1)
      })
    }
  }

  search(text: string): Item[] {
    return this.items.filter(item => {
      const term = text.toLowerCase()
      return item.name.toLowerCase().includes(term)
    })
  }

}
