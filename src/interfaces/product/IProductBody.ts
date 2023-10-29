export interface IPOSTProductBody {
  productId?: string;
  productSlug?: string;
  createdAt?: number;
  userId: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productQuantity: number;
  productWeight: number;
  productImage: string;
  blurhash: string;
}

export interface IDELETEProductBody {
  userId: string;
  productId: string;
}

export interface IPUTProductBody extends IDELETEProductBody {
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productQuantity: number;
  productWeight: number;
}
