import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { CreateItemComponent } from 'src/app/components/create-item/create-item.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { CreateCategoryComponent } from 'src/app/components/create-category/create-category.component';
import { CategoryListComponent } from 'src/app/components/category-list/category-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    CreateItemComponent,
    CategoryComponent,
    CreateCategoryComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItemModule { }
