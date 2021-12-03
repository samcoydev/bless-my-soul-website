import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from 'src/app/components/create-category/create-category.component';
import { CreateItemComponent } from 'src/app/components/create-item/create-item.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { CategoryListComponent } from'src/app/components/category-list/category-list.component';
import { CategoryComponent } from 'src/app/components/category/category.component';

const routes: Routes = [
  { path: 'list', component: ItemListComponent },
  { path: 'id/:itemId', component: ItemComponent },
  { path: 'create', component: CreateItemComponent, canActivate: [AdminGuard] },
  { path: 'category', component: CategoryComponent },
  { path: 'category/create', component: CreateCategoryComponent, canActivate: [AdminGuard] },
  { path: 'category/list', component: CategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
