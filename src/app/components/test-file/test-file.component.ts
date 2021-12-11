import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { TestFileService } from 'src/app/services/test-file/test-file.service'

@Component({
  selector: 'app-test-file',
  templateUrl: './test-file.component.html',
  styleUrls: ['./test-file.component.css']
})
export class TestFileComponent implements OnInit {
  
  fileToUpload!: File;
  rawFiles: any[] = [];
  previewImages: any[] = [];
  previewURL: any;

  constructor(private fileService: TestFileService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() : void {
    this.fileService.getFiles().subscribe((files : any) => {
      this.rawFiles = files;
      this.convertRawFilesToImages();
    });
  }

  convertRawFilesToImages() {
    this.rawFiles.forEach((file: any) => {
      let objectURL = 'data:image/jpeg;base64,' + file.data;
      this.previewImages.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
    });
  }

  handleFileInput(e: any) {
    this.fileToUpload = e.target.files.item(0)
    this.previewURL = this.getUrl(this.fileToUpload)
  }

  getUrl(image: File) {
    var reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image); 
      reader.onload = (_event) => { 
        return reader.result; 
      }
    }
  }

  upload(): void {
    this.fileService.upload(this.fileToUpload).subscribe(data => {
      console.log("it worked");
    }, error => {
      console.log(error);
    })
  }
}
