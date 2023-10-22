import slugify from "slugify";

import PREFIX from "../const/prefix.js";
import getUnixTime from "../utils/getUnixTime.js";
import productDatabase from "../database/product/productDatabase.js";
import walletDatabase from "../database/wallet/walletDatabase.js";
import { validate } from "../utils/validation.js";
import { IPostProductBody } from "../interfaces/product/IPostProductBody.js";
import { ServiceError } from "../error/serviceError.js";
import { postProductValidation } from "../validation/productValidation.js";

const getAll = async (): Promise<Array<object>> => {
  const products = await productDatabase.getAll();

  return products;
};

const insertOne = async (req: IPostProductBody): Promise<object> => {
  const productBody = validate(postProductValidation, req);

  const userWallet = await walletDatabase.getByUserId(productBody.userId);

  if (!userWallet) {
    throw new ServiceError(403, "You must have the wallet first.");
  }

  productBody.productId = PREFIX.PRODUCT;
  //@ts-ignore
  productBody.productSlug = slugify(productBody.productName, { lower: true });
  productBody.createdAt = getUnixTime();

  await productDatabase.insertOne(productBody);

  return { isSucceed: true };
};

export default { getAll, insertOne };
