import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {Image} from "../../models/image.model";
import {ImageType} from "../../helpers/enums/image-type";

@Component({
  selector: 'app-mobile-category',
  templateUrl: './mobile-category.component.html',
  styleUrls: ['./mobile-category.component.css']
})
export class MobileCategoryComponent implements OnInit {

  image: Image = { id: 0, name: '', type: ImageType.Catalog, fileExtension: '', url: '' }
  @Input() category: Category = { id: -1, name: '', sequence: 0, image: this.image };

  constructor() { }

  ngOnInit(): void {
  }

}
