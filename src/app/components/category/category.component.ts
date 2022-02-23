import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'
import { fader } from 'src/app/helpers/animations/fade.animation'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [fader]
})
export class CategoryComponent implements OnInit {
  
  @Input() category: Category = { id: -1, name: '', sequence: 0 };

  constructor(private imageService: ImageService) { }

  ngOnInit(): void { }

  getImageUrl(image?: Image) {
    return this.imageService.convertImageToViewableUrl(image)
  }

}
