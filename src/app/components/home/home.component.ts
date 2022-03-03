import { Component, OnInit } from '@angular/core';
import { fader, slideDown, zoom } from 'src/app/helpers/animations/fade.animation'
import { Category } from 'src/app/models/category.model'
import { Item } from 'src/app/models/item.model'
import { CategoryService } from 'src/app/services/category/category.service'
import { ItemService } from 'src/app/services/item/item.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fader, slideDown, zoom]
})
export class HomeComponent implements OnInit {

  featuredItems: Item[] = []
  featuredCategories: Category[] = []

  newestReleases: Item[] = []

  constructor(private itemService: ItemService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getFeaturedItems()
    this.getNewestItems()
    this.getFeaturedCategories()
  }

  getFeaturedItems(): void {
    this.itemService.getFeaturedItems().subscribe(data => {
      this.featuredItems = data
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

}
