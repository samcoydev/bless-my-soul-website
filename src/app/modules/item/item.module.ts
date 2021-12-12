import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemCreateComponent } from 'src/app/components/item-create/item-create.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { CategoryCreateComponent } from 'src/app/components/category-create/category-create.component';
import { CategoryListComponent } from 'src/app/components/category-list/category-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from 'src/app/components/image/image.component'


@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemCreateComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItemModule { }
