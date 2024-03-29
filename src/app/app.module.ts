import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';
import { CartItemListComponent } from './components/cart-item-list/cart-item-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderComponent } from './components/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MobileItemComponent } from './components/mobile-item/mobile-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CartItemListComponent,
    CartItemComponent,
    OrderCreateComponent,
    OrderListComponent,
    OrderComponent,
    HomeComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ItemModule,
    UserModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
