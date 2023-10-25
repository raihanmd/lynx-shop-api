import slugify from "slugify";

import PREFIX from "../const/prefix.js";
import getUnixTime from "../utils/getUnixTime.js";
import productDatabase from "../database/product/productDatabase.js";
import walletDatabase from "../database/wallet/walletDatabase.js";
import { validate } from "../utils/validation.js";
import { IAddProductBody, IDeleteProductBody, IUpdateProductBody } from "../interfaces/product/IPostProductBody.js";
import { ServiceError } from "../error/serviceError.js";
import { addProductValidation, deleteProductValidation, updateProductValidation } from "../validation/productValidation.js";

const getAll = async (): Promise<Array<object>> => {
  const products = await productDatabase.getAll();

  return products;
};

const insertOne = async (req: IAddProductBody): Promise<object> => {
  const productBody = validate(addProductValidation, req);

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

const update = async (req: IUpdateProductBody): Promise<object> => {
  const productBody = validate(updateProductValidation, req);

  await productDatabase.update(productBody);

  return { isSucceed: true };
};

const deleteOne = async (req: IDeleteProductBody): Promise<object> => {
  const productBody = validate(deleteProductValidation, req);

  await productDatabase.deleteOne(productBody);

  return { isSucceed: true };
};

export default { getAll, insertOne, update, deleteOne };
