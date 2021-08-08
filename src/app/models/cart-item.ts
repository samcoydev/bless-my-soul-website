import { Item } from "./item";
import { User } from "./user";

export class CartItem {
        constructor(
                public id: number,
                public itemID: number,
                public userID: number, 
                public qty: number,
        ) {}
}