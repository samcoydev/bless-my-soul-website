import { Component, OnInit } from '@angular/core';
import { fader, slideDown, zoom } from 'src/app/helpers/animations/fade.animation'
import { Category } from 'src/app/models/category.model'
import { Item } from 'src/app/models/item.model'
import { CategoryService } from 'src/app/services/category/category.service'
import { ItemService } from 'src/app/services/item/item.service'
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fader, slideDown, zoom]
})
export class HomeComponent implements OnInit {

  featuredItems: Item[] = []
  featuredCategories: Category[] = []

  placeHolderTypes = PlaceholderType

  newestReleases: Item[] = []

  groupedItems: any[] = [];

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private breakpointService: BreakpointService) { }

  ngOnInit(): void {
    this.getFeaturedItems()
    this.getNewestItems()
    this.getFeaturedCategories()
  }

  getGroupedItems(items: any[], countPerGroup: number): any[] {
    let groupedItems = [];
    for (let i = 0; i < items.length; i += countPerGroup) {
      groupedItems.push(items.slice(i, i + countPerGroup));
    }
    return groupedItems;
  }

  getFeaturedItems(): void {
    this.itemService.getFeaturedItems().subscribe(data => {
      this.featuredItems = data
      this.groupedItems = this.getGroupedItems(this.featuredItems, 2);
    })
  }

  getNewestItems(): void {
    this.itemService.getNewestItems().subscribe(data => {
      this.newestReleases = data
    })
  }

  getFeaturedCategories(): void {
    this.categoryService.getFeaturedCategories().subscribe(data => {
      console.log(this.featuredCategories)
      this.featuredCategories = data.slice(0, 3)
    })
  }

  getIsMobileScreen() {
    return this.breakpointService.getIsMobileScreen();
  }

  getIsLargerScreen() {
    return this.breakpointService.getIsLargerScreen();
  }

}
