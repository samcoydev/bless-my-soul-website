import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs'
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

  postImage(image: File): Observable<File> {
    const formData: FormData = new FormData();
    formData.append('file', image);
    console.log(image)
    return this.httpClient.post<File>(this.url, formData);
  }

}
