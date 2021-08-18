import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersListComponent } from './components/all-orders-list/all-orders-list.component';
import { HomeComponent } from './components/home/home.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';

const userModule = () => import('./modules/user/user.module').then(x => x.UserModule);
const itemModule = () => import('./modules/item/item.module').then(x => x.ItemModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'user', loadChildren: userModule },
  { path: 'item', loadChildren: itemModule },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'new-order', component: NewOrderComponent, canActivate: [AuthGuard] },
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'all-orders-list', component: AllOrdersListComponent, canActivate: [AdminGuard] },

  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
