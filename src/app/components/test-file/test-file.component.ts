import { Component, OnInit } from '@angular/core';
import { TestFileService } from 'src/app/services/test-file/test-file.service'

@Component({
  selector: 'app-test-file',
  templateUrl: './test-file.component.html',
  styleUrls: ['./test-file.component.css']
})
export class TestFileComponent implements OnInit {
  
  fileToUpload!: File;
  previewURL: any;

  constructor(private fileService: TestFileService) { }

  ngOnInit(): void {

  }

  handleFileInput(e: any) {
    this.fileToUpload = e.target.files.item(0)
    this.getUrl()
  }

  getUrl() {
    var reader = new FileReader();
    if (this.fileToUpload) {
      reader.readAsDataURL(this.fileToUpload); 
      reader.onload = (_event) => { 
        this.previewURL = reader.result; 
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
