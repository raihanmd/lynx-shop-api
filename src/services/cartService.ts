import slugify from "slugify";

import PREFIX from "../const/prefix.js";
import getUnixTime from "../utils/getUnixTime.js";
import productDatabase from "../database/product/productDatabase.js";
import walletDatabase from "../database/wallet/walletDatabase.js";
import { validate } from "../utils/validation.js";
import { IPOSTProductBody, IDELETEProductBody, IPUTProductBody } from "../interfaces/product/IProductBody.js";
import { ServiceError } from "../error/serviceError.js";
import userDatabase from "../database/user/userDatabase.js";
import { IResponseProductServicesGetDetail } from "../interfaces/product/IProductResponse.js";
import cartDatabase from "../database/cart/cartDatabase.js";
import { DELETECartValidation, POSTCartValidation, PUTCartValidation } from "../validation/cartValidation.js";

const get = async (req: { userName: string }): Promise<object[] | string> => {
  const { userName } = req;

  const isUserExist = await userDatabase.getUserName(userName);

  console.log(isUserExist);

  //@ts-ignore
  if (!isUserExist) {
    throw new ServiceError(404, "User not found.");
  }

  const userCart = await cartDatabase.get(userName);

  //@ts-ignore
  if (userCart.length === 0) {
    return "User cart empty.";
  }

  //@ts-ignore
  return userCart;
};
//!Belom beres
const insertOne = async (req: IPOSTProductBody): Promise<object> => {
  const cartBody = validate(POSTCartValidation, req);

  await cartDatabase.get(cartBody);

  return { isSucceed: true };
};

const update = async (req: IPUTProductBody): Promise<object> => {
  const productBody = validate(PUTCartValidation, req);

  await productDatabase.updateOne(productBody);

  return { isSucceed: true };
};

const deleteOne = async (req: IDELETEProductBody): Promise<object> => {
  const productBody = validate(DELETECartValidation, req);

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

export default { get, insertOne, update, deleteOne, getDetail };