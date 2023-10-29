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
const productDatabase_1 = __importDefault(require("../database/product/productDatabase"));
const validation_1 = require("../utils/validation");
const serviceError_1 = require("../error/serviceError");
const userDatabase_1 = __importDefault(require("../database/user/userDatabase"));
const cartDatabase_1 = __importDefault(require("../database/cart/cartDatabase"));
const cartValidation_1 = require("../validation/cartValidation");
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const isUserExist = yield userDatabase_1.default.getUserName(userName);
    console.log(isUserExist);
    //@ts-ignore
    if (!isUserExist) {
        throw new serviceError_1.ServiceError(404, "User not found.");
    }
    const userCart = yield cartDatabase_1.default.get(userName);
    //@ts-ignore
    if (userCart.length === 0) {
        return "User cart empty.";
    }
    //@ts-ignore
    return userCart;
});
//!Belom beres
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const cartBody = (0, validation_1.validate)(cartValidation_1.POSTCartValidation, req);
    yield cartDatabase_1.default.get(cartBody);
    return { isSucceed: true };
});
const update = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(cartValidation_1.PUTCartValidation, req);
    yield productDatabase_1.default.updateOne(productBody);
    return { isSucceed: true };
});
const deleteOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(cartValidation_1.DELETECartValidation, req);
    yield productDatabase_1.default.deleteOne(productBody);
    return { isSucceed: true };
});
const getDetail = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, slugProduct } = req;
    // @ts-ignore
    const userPage = yield userDatabase_1.default.getPage(userName);
    // @ts-ignore
    if (userPage.length === 0) {
        throw new serviceError_1.ServiceError(404, "User not found.");
    }
    const product = yield productDatabase_1.default.getDetail(userName, slugProduct);
    if (!product) {
        throw new serviceError_1.ServiceError(404, "Product not found.");
    }
    // @ts-ignore
    const { userImage: ownerImage, userShopDescription: ownerShopDescription, totalRating: ownerTotalRating } = userPage[0];
    const { userProvince: ownerProvince, userCity: ownerCity, userProvinceId: ownerProvinceId, userCityId: ownerCityId } = yield userDatabase_1.default.getAddress(userName);
    const detailProduct = Object.assign(Object.assign({}, product), { ownerImage, ownerShopDescription, ownerProvince, ownerProvinceId, ownerCity, ownerCityId, ownerTotalRating });
    return detailProduct;
});
exports.default = { get, insertOne, update, deleteOne, getDetail };
