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
    this.getFeaturedCategories()
  }

  getFeaturedItems(): void {
    this.itemService.getAllItems().subscribe(data => {
      this.featuredItems = data.slice(0, 4)
      this.newestReleases = data.slice(-4)
    })
  }

  getFeaturedCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.featuredCategories = data.slice(0, 3)
    })
  }

}
