export enum OrderType {
    Requested = 'REQUESTED',
    Order_Received = 'ORDER_RECEIVED',
    Order_In_Progress = 'ORDER_IN_PROGRESS',
    Order_Complete = 'ORDER_COMPLETE',
}

export const OrderTypeLabelMapping: Record<OrderType, string> = {
    [OrderType.Requested]: "Requested",
    [OrderType.Order_Received]: "Order Received",
    [OrderType.Order_In_Progress]: "Order In Progress",
    [OrderType.Order_Complete]: "Order Complete",
};