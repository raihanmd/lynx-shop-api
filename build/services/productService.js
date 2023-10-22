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
import { registerUserValidation } from "../validation/userValidation.js";
import { getWalletByUserId } from "../database/wallet/getWalletByUserId.js";
import { ServiceError } from "../error/serviceError.js";
import PREFIX from "../const/prefix.js";
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productDatabase.getAll();
    return products;
});
const postOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = validate(registerUserValidation, req);
    const userWallet = yield getWalletByUserId(productBody.userId);
    if (!userWallet) {
        throw new ServiceError(403, "You must have the wallet first.");
    }
    productBody.productId = PREFIX.PRODUCT;
    return [{}];
});
export default { getAll };
