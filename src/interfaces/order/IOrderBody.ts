export interface IPOSTOrderBody {
  orderId?: string;
  orderDate?: number;
  userId: string;
  productId: string;
  productQuantity: number;
}
export interface ICheckoutOrderBody {
  userId: string;
  orderId: string;
  checkoutAt: number;
}
