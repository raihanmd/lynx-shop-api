var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import slugify from "slugify";
import PREFIX from "../const/prefix.js";
import getUnixTime from "../utils/getUnixTime.js";
import productDatabase from "../database/product/productDatabase.js";
import walletDatabase from "../database/wallet/walletDatabase.js";
import { validate } from "../utils/validation.js";
import { ServiceError } from "../error/serviceError.js";
import { addProductValidation, deleteProductValidation, updateProductValidation } from "../validation/productValidation.js";
import userDatabase from "../database/user/userDatabase.js";
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productDatabase.getAll();
    return products;
});
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(addProductValidation, req);
    const userWallet = yield walletDatabase.getByUserId(productBody.userId);
    if (!userWallet) {
        throw new ServiceError(403, "You must have the wallet first.");
    }
    productBody.productId = PREFIX.PRODUCT;
    //@ts-ignore
    productBody.productSlug = slugify(productBody.productName, { lower: true });
    productBody.createdAt = getUnixTime();
    yield productDatabase.insertOne(productBody);
    return { isSucceed: true };
});
const update = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(updateProductValidation, req);
    yield productDatabase.update(productBody);
    return { isSucceed: true };
});
const deleteOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(deleteProductValidation, req);
    yield productDatabase.deleteOne(productBody);
    return { isSucceed: true };
});
const getDetail = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, slugProduct } = req;
    // @ts-ignore
    const userPage = yield userDatabase.getPage(userName);
    // @ts-ignore
    if (userPage.length === 0) {
        throw new ServiceError(404, "User not found.");
    }
    const product = yield productDatabase.getDetail(userName, slugProduct);
    if (!product) {
        throw new ServiceError(404, "Product not found.");
    }
    // @ts-ignore
    const { userImage: ownerImage, userShopDescription: ownerShopDescription, totalRating: ownerTotalRating } = userPage[0];
    const { userProvince: ownerProvince, userCity: ownerCity, userProvinceId: ownerProvinceId, userCityId: ownerCityId } = yield userDatabase.getAddress(userName);
    const detailProduct = Object.assign(Object.assign({}, product), { ownerImage, ownerShopDescription, ownerProvince, ownerProvinceId, ownerCity, ownerCityId, ownerTotalRating });
    return detailProduct;
});
export default { getAll, insertOne, update, deleteOne, getDetail };
