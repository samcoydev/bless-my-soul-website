import { Component, OnInit } from '@angular/core'
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper'
import { ImageType, ImageTypeLabelMapping } from 'src/app/helpers/enums/image-type'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.css']
})
export class ImageCreateComponent implements OnInit {

  rawImage?: File
  cropPreview: any = '';
  newImage: Image = { id: 0, name: '', type: ImageType.Catalog, fileExtension: "", url: '' }

  imageTransform: ImageTransform = {};
  canvasRotation = 0;
  rotation = 0;
  scale = 1;

  typeLabelMapping = ImageTypeLabelMapping
  types = Object.values(ImageType)

  isLoading = false

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  setRawImage(image: any): void {
    if (image) {
      this.rawImage = image
      this.newImage.fileExtension = "." + image.name.split('.').pop()
    }
  }

  imageCropped(e: ImageCroppedEvent) {
    this.cropPreview = e.base64
  }

  imageLoaded() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  loadImageFailed() {
    // error msg
  }

  rotateLeft() {
    this.canvasRotation--
    this.flipAfterRotate()
  }

  rotateRight() {
    this.canvasRotation++
    this.flipAfterRotate()
  }

  private flipAfterRotate() {
    const flippedH = this.imageTransform.flipH
    const flippedV = this.imageTransform.flipV
    this.imageTransform = {
      ...this.imageTransform,
      flipH: flippedV,
      flipV: flippedH
    }
  }


  flipHorizontal() {
    this.imageTransform = {
      ...this.imageTransform,
      flipH: !this.imageTransform.flipH
    }
  }

  flipVertical() {
    this.imageTransform = {
      ...this.imageTransform,
      flipV: !this.imageTransform.flipV
    }
  }

  resetImage() {
    this.scale = 1
    this.rotation = 0
    this.canvasRotation = 0
    this.imageTransform = {}
  }

  zoomOut() {
    this.scale -= .1
    this.imageTransform = {
      ...this.imageTransform,
      scale: this.scale
    }
  }

  zoomIn() {
    this.scale += .1
    this.imageTransform = {
      ...this.imageTransform,
      scale: this.scale
    }
  }

  updateRotation() {
    this.imageTransform = {
      ...this.imageTransform,
      rotate: this.rotation
    }
  }

  uploadImage(): void {
    if (!this.rawImage) return

    this.imageService.postImage(this.rawImage, this.newImage)
      .subscribe(
        data => console.log("[POST] ", data),
        error => console.error(error))
  }

}
