import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { Observable } from 'rxjs'
import { Image } from 'src/app/models/image.model'

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(image: Image, ...args: unknown[]): Observable<SafeUrl> {
    return new Observable<SafeUrl>((observer) => observer.next(this.sanitizer.bypassSecurityTrustUrl(image.url)))
  }

}
