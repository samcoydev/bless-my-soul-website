import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from 'src/app/components/create-item/create-item.component';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  { path: 'list', component: ItemListComponent },
  { path: 'id/:itemId', component: ItemComponent },
  { path: 'create', component: CreateItemComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
