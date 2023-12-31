"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prefix_1 = __importDefault(require("../const/prefix"));
const userDatabase_1 = __importDefault(require("../database/user/userDatabase"));
const getUuid_1 = require("../utils/getUuid");
const validation_1 = require("../utils/validation");
const serviceError_1 = require("../error/serviceError");
const userValidation_1 = require("../validation/userValidation");
const userValidation_2 = require("../validation/userValidation");
const verify = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = (0, validation_1.validate)(userValidation_1.verifyUserValidation, req);
    yield userDatabase_1.default.verify(userBody);
    return { isSucceed: true };
});
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = (0, validation_1.validate)(userValidation_2.registerUserValidation, req);
    userBody.userId = prefix_1.default.USER + (0, getUuid_1.getUuid)();
    yield userDatabase_1.default.register(userBody);
    const userName = yield userDatabase_1.default.getUserName(userBody.userName);
    return userName;
});
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = (0, validation_1.validate)(userValidation_1.loginUserValidation, req);
    const userName = yield userDatabase_1.default.login(userBody);
    if (userName === undefined) {
        throw new serviceError_1.ServiceError(401, "Unauthorized");
    }
    return userName;
});
const getUserPage = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const userProduct = yield userDatabase_1.default.getProducts(userName);
    const userPage = yield userDatabase_1.default.getPage(userName);
    // @ts-ignore
    if (userPage.length === 0) {
        throw new serviceError_1.ServiceError(404, "User not found.");
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
    const { userProvince, userCity } = yield userDatabase_1.default.getAddress(userName);
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
    const userAddress = yield userDatabase_1.default.getAddress(userName);
    if (!userAddress) {
        throw new serviceError_1.ServiceError(404, "user not found.");
    }
    return userAddress;
});
exports.default = { verify, register, login, getUserPage, getAddress };
