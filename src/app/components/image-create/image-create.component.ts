import { Component, OnInit, ViewChild } from '@angular/core'
import { base64ToFile, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper'
import { ImageType, ImageTypeLabelMapping } from 'src/app/helpers/enums/image-type'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image/image.service'
import { DOC_ORIENTATION, NgxImageCompressService } from "ngx-image-compress"

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.css']
})
export class ImageCreateComponent implements OnInit {

  rawImage: any = ''
  cropPreview: any = ''
  newImage: Image = { id: 0, name: '', type: ImageType.Catalog, fileExtension: "", url: '' }

  imageTransform: ImageTransform = {};
  imageChangedEvent: any = ''
  canvasRotation = 0;
  rotation = 0;
  scale = 1;

  typeLabelMapping = ImageTypeLabelMapping
  types = Object.values(ImageType)

  isLoading = false

  // @ViewChild(ImageCropperComponent)
  // imageCropper!: ImageCropperComponent

  constructor(
    private imageService: ImageService,
    private compressionService: NgxImageCompressService) { }

  ngOnInit(): void { }

  compressFile(): void {
    this.compressionService.uploadFile().then(
      ({ image, orientation, fileName }) => {
        this.compressionService
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              this.rawImage = compressedImage
              console.log(this.rawImage)
              if (fileName) {
                this.newImage.fileExtension = "." + fileName.split('.').pop()
                this.newImage.name = fileName
              }
            }
          )
      }
    )
  }

  getMimeType(dataUrl: any): string {
    return dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"))
  }

  dataURLtoFile(dataurl: any, fileName: string): Promise<File> {
    return (fetch(dataurl)
      .then(function (res) { return res.arrayBuffer() })
      .then((buf) => { return new File([buf], fileName, { type: this.getMimeType(this.rawImage) }) })
    )
  }

  uploadImage(): void {
    if (!this.rawImage) return

    // If autocrop gets turned off use this: this.imageCropper.crop()

    this.dataURLtoFile(this.cropPreview, this.newImage.name).then(
      (image) => {
        this.imageService.postImage(image, this.newImage)
          .subscribe(
            data => console.log("[POST] ", data),
            error => console.error(error))
      }
    )
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

}
