export interface IAddProductBody {
  productId?: string;
  productSlug?: string;
  createdAt?: string;
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

export interface IUpdateProductBody {
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productQuantity: number;
  productWeight: number;
}

export interface IDeleteProductBody {
  userId: string;
  productId: string;
}
