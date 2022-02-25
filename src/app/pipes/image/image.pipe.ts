import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { Observable } from 'rxjs'
import { Image } from 'src/app/models/image.model'

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(image?: Image, ...args: unknown[]): Observable<SafeUrl> {
    //this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + image.data)
    return new Observable<SafeUrl>((observer) => observer.next(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + image?.data)))
  }

}
