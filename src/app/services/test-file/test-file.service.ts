import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TestFileService {

  private url = environment.apiUrl + '/file';

  constructor(private httpClient: HttpClient) { }

  getFiles(): Observable<any[]> {
    //, { responseType: 'blob' as 'json'} 
    return this.httpClient.get<any[]>(this.url);
  }

  upload(file: File): Observable<File> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<File>(this.url, formData);
  }
  
}
