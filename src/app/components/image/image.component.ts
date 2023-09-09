import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { Image } from 'src/app/models/image.model'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() itemImage?: Image
  @Input() editMode: Boolean = false;
  selectedImage?: File
  previewUrl: any
  isFileInvalid: Boolean = false
  @Output() selectedImageEvent = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (this.itemImage)
      this.convertImageToViewableUrl(this.itemImage)
  }

  getPreviewUrl(): void {
    var reader = new FileReader()
    if (this.selectedImage && this.editMode) {
      reader.readAsDataURL(this.selectedImage)
      reader.onload = (_event) => {
        this.previewUrl = reader.result
      }
    }
  }

  convertImageToViewableUrl(image: Image): void {
    this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(image.url)
  }

  onImageChange(_event: any): void {
    if (_event.target.files.item(0).type == "image/jpeg" && _event.target.files.length <= 1) {
      this.isFileInvalid = false
      this.selectedImage = _event.target.files.item(0)
      this.selectedImageEvent.emit(this.selectedImage)
      this.getPreviewUrl()
    } else {
      this.isFileInvalid = true
      this.previewUrl = false
      this.selectedImageEvent.emit(false)
      console.log("File either wasn't a JPEG, or you've uploaded more than one.")
    }
  }

}
