import { Component, OnInit } from '@angular/core';
import { ImageType, ImageTypeLabelMapping } from 'src/app/helpers/enums/image-type'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.css']
})
export class ImageCreateComponent implements OnInit {

  rawImage?: File;
  newImage: Image = {id: 0, name: '', type: ImageType.Catalog, fileExtension: "", url: ''}

  typeLabelMapping = ImageTypeLabelMapping
  types = Object.values(ImageType)

  isLoading = false

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  setRawImage(image: any): void {
    if (image) {
      this.rawImage = image
      this.newImage.fileExtension = "." + image.name.split('.').pop();
    }
  }

  uploadImage(): void {
    if (!this.rawImage) return;

    this.imageService.postImage(this.rawImage, this.newImage)
      .subscribe(
        data => console.log("[POST] ", data), 
        error => console.error(error))
  }

}
