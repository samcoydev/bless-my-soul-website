import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'
import { fader } from 'src/app/helpers/animations/fade.animation'
import { ImageType } from 'src/app/helpers/enums/image-type'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [fader]
})
export class CategoryComponent implements OnInit {
  
  image: Image = {id: 0, name: '', type: ImageType.Catalog, fileExtension: '', url: ''}
  @Input() category: Category = { id: -1, name: '', sequence: 0, image: this.image};

  constructor(private imageService: ImageService) { }

  ngOnInit(): void { }

  getImageUrl(image?: Image) {
    let res = this.imageService.convertImageToViewableUrl(image)
    console.log("WEEWEE", res)
    return res
  }

}
