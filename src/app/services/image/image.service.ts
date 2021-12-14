import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs'
import { Image } from 'src/app/models/image.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = environment.apiUrl + '/image';

  constructor(private httpClient: HttpClient) { }

  getFiles(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  postImage(image: File): Observable<Image> {
    const formData: FormData = new FormData();
    // The name here must match the MultipartFile variable name in
    // saveImage on the API.
    formData.append('image', image);
    return this.httpClient.post<Image>(this.url, formData);
  }

}
