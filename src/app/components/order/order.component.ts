import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderTypeLabelMapping } from 'src/app/helpers/order-type';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order!: Order;
  orderLabelMapping = OrderTypeLabelMapping;

  constructor() { }

  ngOnInit(): void {
  }

}
