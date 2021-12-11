import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CartItemListComponent } from './components/cart-item-list/cart-item-list.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { TestFileComponent } from './components/test-file/test-file.component'

const userModule = () => import('./modules/user/user.module').then(x => x.UserModule);
const itemModule = () => import('./modules/item/item.module').then(x => x.ItemModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'user', loadChildren: userModule },
  { path: 'item', loadChildren: itemModule },
  { path: 'cart', component: CartItemListComponent, canActivate: [AuthGuard] },
  { path: 'new-order', component: OrderCreateComponent, canActivate: [AuthGuard] },
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'all-orders-list', component: OrderListComponent, canActivate: [AdminGuard] },
  { path: 'file', component: TestFileComponent },

  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
