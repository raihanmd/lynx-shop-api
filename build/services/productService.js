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
//@ts-ignore
const slugify_1 = __importDefault(require("slugify"));
const prefix_1 = __importDefault(require("../const/prefix"));
const getUnixTime_1 = __importDefault(require("../utils/getUnixTime"));
const productDatabase_1 = __importDefault(require("../database/product/productDatabase"));
const walletDatabase_1 = __importDefault(require("../database/wallet/walletDatabase"));
const validation_1 = require("../utils/validation");
const serviceError_1 = require("../error/serviceError");
const productValidation_1 = require("../validation/productValidation");
const userDatabase_1 = __importDefault(require("../database/user/userDatabase"));
const getUuid_1 = require("../utils/getUuid");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productDatabase_1.default.getAll();
    return products;
});
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(productValidation_1.POSTProductValidation, req);
    const userWallet = yield walletDatabase_1.default.getByUserId(productBody.userId);
    if (!userWallet) {
        throw new serviceError_1.ServiceError(403, "You must have the wallet first.");
    }
    productBody.productId = prefix_1.default.PRODUCT + (0, getUuid_1.getUuid)();
    //@ts-ignore
    productBody.productSlug = (0, slugify_1.default)(productBody.productName, { lower: true });
    productBody.createdAt = (0, getUnixTime_1.default)();
    yield productDatabase_1.default.insertOne(productBody);
    return { isSucceed: true };
});
const update = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(productValidation_1.PUTProductValidation, req);
    yield productDatabase_1.default.updateOne(productBody);
    return { isSucceed: true };
});
const deleteOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(productValidation_1.DELETEProductValidation, req);
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
exports.default = { getAll, insertOne, update, deleteOne, getDetail };
