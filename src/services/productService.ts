//@ts-ignore
import slugify from "slugify";

import PREFIX from "../const/prefix";
import getUnixTime from "../utils/getUnixTime";
import productDatabase from "../database/product/productDatabase";
import walletDatabase from "../database/wallet/walletDatabase";
import { validate } from "../utils/validation";
import { IPOSTProductBody, IDELETEProductBody, IPUTProductBody } from "../interfaces/product/IProductBody";
import { ServiceError } from "../error/serviceError";
import { POSTProductValidation, DELETEProductValidation, PUTProductValidation } from "../validation/productValidation";
import userDatabase from "../database/user/userDatabase";
import { IResponseProductServicesGetDetail } from "../interfaces/product/IProductResponse";
import { getUuid } from "../utils/getUuid";

const getAll = async (): Promise<Array<object>> => {
  const products = await productDatabase.getAll();

  return products;
};

const insertOne = async (req: IPOSTProductBody): Promise<object> => {
  const productBody = validate(POSTProductValidation, req);

  const userWallet = await walletDatabase.getByUserId(productBody.userId);

  if (!userWallet) {
    throw new ServiceError(403, "You must have the wallet first.");
  }

  productBody.productId = PREFIX.PRODUCT + getUuid();
  //@ts-ignore
  productBody.productSlug = slugify(productBody.productName, { lower: true });
  productBody.createdAt = getUnixTime();

  await productDatabase.insertOne(productBody);

  return { isSucceed: true };
};

const update = async (req: IPUTProductBody): Promise<object> => {
  const productBody = validate(PUTProductValidation, req);

  await productDatabase.updateOne(productBody);

  return { isSucceed: true };
};

const deleteOne = async (req: IDELETEProductBody): Promise<object> => {
  const productBody = validate(DELETEProductValidation, req);

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
