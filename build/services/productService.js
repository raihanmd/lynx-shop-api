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
import { postProductValidation } from "../validation/productValidation.js";
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productDatabase.getAll();
    return products;
});
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(postProductValidation, req);
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
export default { getAll, insertOne };
