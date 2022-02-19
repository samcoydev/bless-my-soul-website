import { Component, OnInit } from '@angular/core';
import { fader, slideDown, zoom } from 'src/app/helpers/animations/fade.animation'
import { Item } from 'src/app/models/item.model'
import { ItemService } from 'src/app/services/item/item.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fader, slideDown, zoom]
})
export class HomeComponent implements OnInit {

  featuredItems: Item[] = []
  newestReleases: Item[] = []

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getFeaturedItems()
  }

  getFeaturedItems(): void {
    this.itemService.getAllItems().subscribe(data => {
      this.featuredItems = data.slice(0, 4)
      this.newestReleases = data.slice(-4)
    })
  }

}
