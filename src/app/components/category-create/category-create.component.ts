import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ImageType } from 'src/app/helpers/enums/image-type'
import { Category } from 'src/app/models/category.model';
import { Image } from 'src/app/models/image.model'
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageService } from 'src/app/services/image/image.service'

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  image: Image = {id: 0, name: '', type: ImageType.Catalog, fileExtension: '', url: ''}
  images: Image[] = []
  category: Category = { id: 0, name: '', sequence: 0, image: this.image}

  isSubmitted = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getImages()
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(response => {
        this.images = response
      })
  }

  createCategory(): void {
    this.isSubmitted = true
    this.isLoading = true

    this.categoryService.postCategory(this.category)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
          this.router.navigateByUrl(returnUrl)
        },
        error: error => this.isLoading = false
    })
  }

}