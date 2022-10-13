import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { startWith, map } from 'rxjs/operators'
import { ImageType, ImageTypeLabelMapping } from 'src/app/helpers/enums/image-type'
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'
import { StateType, StateTypeLabelMapping } from 'src/app/helpers/enums/state-type'
import { Image } from 'src/app/models/image.model'
import { CategoryService } from 'src/app/services/category/category.service'
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-image-table',
  templateUrl: './image-table.component.html',
  styleUrls: ['./image-table.component.css']
})
export class ImageTableComponent implements OnInit {

  images: Image[] = []
  editedImage?: Image
  selectedImageIds: number[] = []
  editImageId: number = -1

  filter: FormControl = new FormControl('')
  types = Object.values(ImageType)

  typeLabelMapping = ImageTypeLabelMapping
  placeHolderTypes = PlaceholderType

  constructor(
    private imageService: ImageService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getImages()
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(data => this.images = data)
  }

  viewImage(image: Image) {
    this.editImageId = image.id
    this.editedImage = JSON.parse(JSON.stringify(image))
    if (this.editedImage)
      this.editedImage.name = this.editedImage.name.split(".")[0]
  }

  onSelect(event: any, imageId: number): void {
    if (event.target.checked) {
      this.selectedImageIds.push(imageId)
    } else {
      this.selectedImageIds.splice(this.selectedImageIds.indexOf(imageId), 1)
    }
  }

  saveChanges(): void {
    if (!this.editedImage) { return }
    console.log("IMAGE: ", this.editedImage)
    this.imageService.updateImage(this.editedImage).subscribe(data => {
      this.editedImage = undefined
      this.getImages()
    }, error => console.error(error))
  }

  deleteImage(imageId: number): void {
    if (this.selectedImageIds.indexOf(imageId))
      this.selectedImageIds.splice(this.selectedImageIds.indexOf(imageId), 1)

    this.imageService.deleteImage(imageId).subscribe(data => {
      this.editedImage = undefined
      this.getImages()
    })
  }

  deleteSelected(): void {
    let updatedCount = 0

    for(let i = 0; i < this.selectedImageIds.length; i++) {
      this.imageService.deleteImage(this.selectedImageIds[i]).subscribe(data => {
        updatedCount++
        if (updatedCount == this.selectedImageIds.length)
          this.getImages()
          
        if (this.selectedImageIds.indexOf(i))
          this.selectedImageIds.splice(this.selectedImageIds.indexOf(i), 1)
      })
    }
  }

}
