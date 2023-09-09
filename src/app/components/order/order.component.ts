import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderTypeLabelMapping } from 'src/app/helpers/enums/order-type';
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'
import { ActivatedRoute } from '@angular/router'
import { CartService } from 'src/app/services/cart/cart.service'
import { ItemService } from 'src/app/services/item/item.service'
import { UserService } from 'src/app/services/user/user.service'
import { OrderService } from 'src/app/services/order/order.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order?: Order

  placeHolderTypes = PlaceholderType
  orderLabelMapping = OrderTypeLabelMapping

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    if (routeParams.get('orderId'))
      this.getOrderById(Number(routeParams.get('orderId')))
  }

  getOrderById(id: number): void {
    this.orderService.getOrderByID(id)
      .subscribe(response => this.order = response)
  }

}
