export enum OrderType {
    Requested = 'REQUESTED',
    Order_Recieved = 'ORDER_RECIEVED',
    Order_In_Progress = 'ORDER_IN_PROGRESS',
    Order_Complete = 'ORDER_COMPLETE',
}

export const OrderTypeLabelMapping: Record<OrderType, string> = {
    [OrderType.Requested]: "Requested",
    [OrderType.Order_Recieved]: "Order_Recieved",
    [OrderType.Order_In_Progress]: "Order_In_Progress",
    [OrderType.Order_Complete]: "Order_Complete",
};