export interface IPOSTCartBody {
  cartId?: string;
  userId: string;
  productId: string;
  productQuantity: number;
}

export interface IPUTCartBody extends IPOSTCartBody {
  cartId: string;
}

export interface IDELETECartBody {
  cartId: string;
  userId: string;
}
