import { validate } from "../utils/validation";
import { getUuid } from "../utils/getUuid";
import { IPOSTReviewBody, IPUTReviewBody } from "../interfaces/review/IReviewBody";
import { POSTReviewValidation, PUTReviewValidation } from "../validation/reviewValidation";
import PREFIX from "../const/prefix";
import reviewDatabase from "../database/review/reviewDatabase";
import getUnixTime from "../utils/getUnixTime";

const get = async (req: { productId: string }): Promise<string> => {
  const { productId } = req;

  const productReview = await reviewDatabase.get(productId);

  //@ts-ignore
  if (productReview.length === 0) {
    return "Product review empty.";
  }

  //@ts-ignore
  return productReview;
};

const insertOne = async (req: IPOSTReviewBody): Promise<object> => {
  const reviewBody = validate(POSTReviewValidation, req);

  reviewBody.cartId = PREFIX.REVIEW + getUuid();
  reviewBody.createdAt = getUnixTime();

  await reviewDatabase.insertOne(reviewBody);

  return { isSucceed: true };
};

const updateOne = async (req: IPUTReviewBody): Promise<object> => {
  const reviewBody = validate(PUTReviewValidation, req);

  reviewBody.updatedAt = getUnixTime();

  await reviewDatabase.updateOne(reviewBody);

  return { isSucceed: true };
};

export default { get, insertOne, updateOne };
