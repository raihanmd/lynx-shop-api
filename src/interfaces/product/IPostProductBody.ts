export interface IPostProductBody {
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
