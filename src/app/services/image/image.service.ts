import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { Observable, Observer } from 'rxjs'
import { Image } from 'src/app/models/image.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = environment.apiUrl + '/image';

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
    ) { }

  getImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.url);
  }

  postImage(image: File, imageMetaData: Image): Observable<Image> {
    const formData: FormData = new FormData();
    // The name here must match the MultipartFile variable name in
    // saveImage on the API.
    formData.append('image', image);
    formData.append("name", imageMetaData.name)
    formData.append("type", imageMetaData.type)
    formData.append("fileExtension", imageMetaData.fileExtension)

    console.log(formData.getAll("image"), formData.getAll("name"), formData.getAll("type"));
    return this.httpClient.post<Image>(this.url, formData);
  }

  updateImage(image: Image): Observable<Image> {
    return this.httpClient.put<Image>(this.url + "/" + `${image.id}`, image)
  }

  deleteImage(id: number): Observable<Image> {
    return this.httpClient.delete<Image>(this.url + "/" + `${id}`)
  }

  getPreviewUrl(selectedImage: any): void {
    var reader = new FileReader()
    reader.readAsDataURL(selectedImage);
    reader.onload = (_event) => { 
      return reader.result
    }
  }

  convertImageToViewableUrl(image?: Image) {
    if (image == undefined) { return }
    return this.sanitizer.bypassSecurityTrustUrl(image.url)
  }

}
