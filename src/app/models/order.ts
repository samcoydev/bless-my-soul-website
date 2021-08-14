import { OrderType } from "../helpers/order-type";

export class Order {
        constructor(
                public id: number,
                public userID: number,
                public itemIDs: number[],
                public notes: string,
                public status: OrderType
        ) {}
}