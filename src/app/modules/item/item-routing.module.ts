import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from 'src/app/components/category-create/category-create.component';
import { ItemCreateComponent } from 'src/app/components/item-create/item-create.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { CategoryListComponent } from'src/app/components/category-list/category-list.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { ItemOverviewComponent } from 'src/app/components/item-overview/item-overview.component'

const routes: Routes = [
  { path: 'list', component: ItemListComponent },
  { path: 'id/:itemId', component: ItemOverviewComponent },
  { path: 'create', component: ItemCreateComponent, canActivate: [AdminGuard] },
  { path: 'category', component: CategoryComponent },
  { path: 'category/create', component: CategoryCreateComponent, canActivate: [AdminGuard] },
  { path: 'category/list', component: CategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
