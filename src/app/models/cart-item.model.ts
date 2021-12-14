import { Item } from "./item.model";
import { User } from "./user.model";

export interface CartItem {
        id: number;
        item: Item;
        user: User;
        qty: number;
}