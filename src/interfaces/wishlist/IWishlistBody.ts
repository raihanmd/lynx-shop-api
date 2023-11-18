export interface IPOSTWishlistBody extends IDELETEWishlistBody {
  productId: string;
}

export interface IDELETEWishlistBody {
  wishlistId?: string;
  userId: string;
}
