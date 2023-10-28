var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productDatabase from "../database/product/productDatabase.js";
import { validate } from "../utils/validation.js";
import { ServiceError } from "../error/serviceError.js";
import userDatabase from "../database/user/userDatabase.js";
import cartDatabase from "../database/cart/cartDatabase.js";
import { DELETECartValidation, POSTCartValidation, PUTCartValidation } from "../validation/cartValidation.js";
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const isUserExist = yield userDatabase.getUserName(userName);
    console.log(isUserExist);
    //@ts-ignore
    if (!isUserExist) {
        throw new ServiceError(404, "User not found.");
    }
    const userCart = yield cartDatabase.get(userName);
    //@ts-ignore
    if (userCart.length === 0) {
        return "User cart empty.";
    }
    //@ts-ignore
    return userCart;
});
//!Belom beres
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const cartBody = validate(POSTCartValidation, req);
    yield cartDatabase.get(cartBody);
    return { isSucceed: true };
});
const update = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(PUTCartValidation, req);
    yield productDatabase.updateOne(productBody);
    return { isSucceed: true };
});
const deleteOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(DELETECartValidation, req);
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
export default { get, insertOne, update, deleteOne, getDetail };
