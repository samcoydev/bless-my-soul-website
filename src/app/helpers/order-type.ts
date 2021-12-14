export enum OrderType {
    Requested = 'REQUESTED',
    Order_Received = 'ORDER_RECEIVED',
    Waiting_On_Materials = 'WAITING_ON_MATERIALS',
    Order_In_Progress = 'ORDER_IN_PROGRESS',
    Order_Complete = 'ORDER_COMPLETE',
}

export const OrderTypeLabelMapping: Record<OrderType, string> = {
    [OrderType.Requested]: "Requested",
    [OrderType.Order_Received]: "Order Received",
    [OrderType.Waiting_On_Materials]: "Waiting On Materials",
    [OrderType.Order_In_Progress]: "Order In Progress",
    [OrderType.Order_Complete]: "Order Complete",
};