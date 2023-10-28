var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PREFIX from "../const/prefix.js";
import userDatabase from "../database/user/userDatabase.js";
import { getNanoid } from "../utils/getNanoid.js";
import { validate } from "../utils/validation.js";
import { ServiceError } from "../error/serviceError.js";
import { loginUserValidation } from "../validation/userValidation.js";
import { registerUserValidation } from "../validation/userValidation.js";
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = validate(registerUserValidation, req);
    user.userId = PREFIX.USER + getNanoid();
    const { userName } = yield userDatabase.register(user);
    return userName;
});
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const loginRequest = validate(loginUserValidation, req);
    const { userName } = yield userDatabase.login(loginRequest);
    if (userName === undefined) {
        throw new ServiceError(401, "Unauthorized");
    }
    return userName;
});
const getUserPage = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const userProduct = yield userDatabase.getProducts(userName);
    const userPage = yield userDatabase.getPage(userName);
    // @ts-ignore
    if (userPage.length === 0) {
        throw new ServiceError(404, "User not found.");
    }
    // @ts-ignore
    const { userImage, userBanner, userBio, userShopDescription, totalRating } = userPage[0];
    // @ts-ignore
    if (userProduct.length === 0) {
        const response = {
            userImage,
            userName,
        };
        return response;
    }
    const { userProvince, userCity } = yield userDatabase.getAddress(userName);
    //@ts-ignore
    if (!userProduct[0].productId) {
        //@ts-ignore
        return userProduct[0].userName;
    }
    const response = {
        userName,
        userImage,
        userBanner,
        userBio,
        userShopDescription,
        userProvince,
        userCity,
        totalRating,
        userProduct,
    };
    return response;
});
const getAddress = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const userAddress = yield userDatabase.getAddress(userName);
    if (!userAddress) {
        throw new ServiceError(404, "user not found.");
    }
    return userAddress;
});
export default { register, login, getUserPage, getAddress };
