import { Item } from "./item";
import { Order } from "./order";
import { User } from "./user";

export class CartItem {
        constructor(
                public id: number,
                public item: Item,
                public user: User, 
                public qty: number,
        ) {}
}