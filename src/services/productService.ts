import productDatabase from "../database/product/productDatabase.js";
import { validate } from "../utils/validation.js";
import { IPostProductBody } from "../interfaces/product/IPostProductBody.js";
import { registerUserValidation } from "../validation/userValidation.js";
import { getWalletByUserId } from "../database/wallet/getWalletByUserId.js";
import { ServiceError } from "../error/serviceError.js";
import PREFIX from "../const/prefix.js";

const getAll = async (): Promise<Array<object>> => {
  const products = await productDatabase.getAll();

  return products;
};

const postOne = async (req: IPostProductBody): Promise<Array<object>> => {
  const productBody = validate(registerUserValidation, req);

  const userWallet = await getWalletByUserId(productBody.userId);

  if (!userWallet) {
    throw new ServiceError(403, "You must have the wallet first.");
  }

  productBody.productId = PREFIX.PRODUCT;

  return [{}];
};

export default { getAll };
