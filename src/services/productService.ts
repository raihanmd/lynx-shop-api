import slugify from "slugify";

import PREFIX from "../const/prefix.js";
import getUnixTime from "../utils/getUnixTime.js";
import productDatabase from "../database/product/productDatabase.js";
import walletDatabase from "../database/wallet/walletDatabase.js";
import { validate } from "../utils/validation.js";
import { IPOSTProductBody, IDELETEProductBody, IPUTProductBody } from "../interfaces/product/IProductBody.js";
import { ServiceError } from "../error/serviceError.js";
import { addProductValidation, deleteProductValidation, updateProductValidation } from "../validation/productValidation.js";
import userDatabase from "../database/user/userDatabase.js";
import { IResponseProductServicesGetDetail } from "../interfaces/product/IProductResponse.js";

const getAll = async (): Promise<Array<object>> => {
  const products = await productDatabase.getAll();

  return products;
};

const insertOne = async (req: IPOSTProductBody): Promise<object> => {
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

const update = async (req: IPUTProductBody): Promise<object> => {
  const productBody = validate(updateProductValidation, req);

  await productDatabase.update(productBody);

  return { isSucceed: true };
};

const deleteOne = async (req: IDELETEProductBody): Promise<object> => {
  const productBody = validate(deleteProductValidation, req);

  await productDatabase.deleteOne(productBody);

  return { isSucceed: true };
};

const getDetail = async (req: { userName: string } | any): Promise<IResponseProductServicesGetDetail> => {
  const { userName, slugProduct } = req;

  // @ts-ignore
  const userPage = await userDatabase.getPage(userName);

  // @ts-ignore
  if (userPage.length === 0) {
    throw new ServiceError(404, "User not found.");
  }

  const product = await productDatabase.getDetail(userName, slugProduct);

  if (!product) {
    throw new ServiceError(404, "Product not found.");
  }

  // @ts-ignore
  const { userImage: ownerImage, userShopDescription: ownerShopDescription, totalRating: ownerTotalRating } = userPage[0];

  const { userProvince: ownerProvince, userCity: ownerCity, userProvinceId: ownerProvinceId, userCityId: ownerCityId } = await userDatabase.getAddress(userName);

  const detailProduct = { ...product, ownerImage, ownerShopDescription, ownerProvince, ownerProvinceId, ownerCity, ownerCityId, ownerTotalRating };

  return detailProduct;
};

export default { getAll, insertOne, update, deleteOne, getDetail };
