import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TestFileService {

  private url = environment.apiUrl + '/file';

  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<File> {
    console.log("FILE: ", file);

    const formData: FormData = new FormData();
    formData.append('file', file);


    return this.httpClient.post<File>(this.url, formData);
  }

}
