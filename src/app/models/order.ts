import { OrderType } from "../helpers/order-type";
import { CartItem } from "./cart-item";
import { User } from "./user";

export class Order {
        constructor(
                public id: number,
                public user: User,
                public cartItems: CartItem[],
                public notes: string,
                public state: OrderType
        ) {}
}