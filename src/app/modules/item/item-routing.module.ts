import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from 'src/app/components/create-item/create-item.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { ItemComponent } from 'src/app/components/item/item.component';

const routes: Routes = [
  { path: 'list', component: ItemListComponent },
  { path: 'id/:itemId', component: ItemComponent },
  { path: 'create', component: CreateItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
