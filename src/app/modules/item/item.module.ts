import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { CreateItemComponent } from 'src/app/components/create-item/create-item.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    CreateItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule
  ]
})
export class ItemModule { }
