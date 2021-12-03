import { OrderType } from "../helpers/order-type";
import { CartItem } from "./cart-item.model";
import { User } from "./user.model";

export interface Order {
        id: number;
        user: User;
        cartItems: CartItem[];
        notes: string;
        state: OrderType;
}