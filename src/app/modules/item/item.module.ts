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
import { ImageComponent } from 'src/app/components/image/image.component';
import { ShortenPipe } from 'src/app/pipes/shorten/shorten.pipe'
import { ItemOverviewComponent } from 'src/app/components/item-overview/item-overview.component'
import { CategoryTableComponent } from 'src/app/components/category-table/category-table.component'
import { ImagePipe } from 'src/app/pipes/image/image.pipe'
import { ItemTableComponent } from 'src/app/components/item-table/item-table.component'


@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemOverviewComponent,
    ItemTableComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    ImageComponent,
    ShortenPipe,
    ImagePipe,
    CategoryTableComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ImageComponent,
    CategoryComponent,
    CategoryTableComponent,
    ItemComponent,
    ImagePipe,
    ShortenPipe
  ]
})
export class ItemModule { }
