interface IReviewBody {
  reviewsId?: string;
  userId: string;
  productId: string;
  reviewsRating: number;
  reviewsComment: string;
}
export interface IPOSTReviewBody extends IReviewBody {
  createdAt: number;
}
export interface IPUTReviewBody extends IReviewBody {
  updatedAt: string;
}
