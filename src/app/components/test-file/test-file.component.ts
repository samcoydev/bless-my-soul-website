import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-test-file',
  templateUrl: './test-file.component.html',
  styleUrls: ['./test-file.component.css']
})
export class TestFileComponent implements OnInit {
  
  fileToUpload!: File
  imageUrls: any[] = []
  previewUrl: any

  isFileInvalid: Boolean = false

  constructor(
    private fileService: ImageService, 
    private sanitizer: DomSanitizer) 
    { }

  ngOnInit(): void {
    this.getImages()
  }

  getImages() : void {
    this.fileService.getFiles().subscribe((files : any[]) => {
      this.convertRawFilesToImages(files)
    })
  }
  
  upload(): void {
    this.fileService.postImage(this.fileToUpload).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  onImageChange(_event: any): void {
    if (_event.target.files.item(0).type == "image/jpeg" && _event.target.files.length == 1) {
      this.isFileInvalid = false
      this.fileToUpload = _event.target.files.item(0)
      this.getPreviewUrl()
    } else {
      this.isFileInvalid = true
      this.previewUrl = ''
      console.log("File either wasn't a JPEG, or you've uploaded more than one.")
    }
  }

  convertRawFilesToImages(rawFiles: any[]): void {
    rawFiles.forEach((file: any) => {
      let objectURL = 'data:image/jpeg;base64,' + file.data
      this.imageUrls.push(this.sanitizer.bypassSecurityTrustUrl(objectURL))
    })
  }

  getPreviewUrl(): void {
    var reader = new FileReader()
    if (this.fileToUpload) {
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = (_event) => { 
        this.previewUrl = reader.result
      }
    }
  }

}
