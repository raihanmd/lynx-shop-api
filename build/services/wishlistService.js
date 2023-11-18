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
const validation_1 = require("../utils/validation");
const serviceError_1 = require("../error/serviceError");
const prefix_1 = __importDefault(require("../const/prefix"));
const getUuid_1 = require("../utils/getUuid");
const userDatabase_1 = __importDefault(require("../database/user/userDatabase"));
const wishlistDatabase_1 = __importDefault(require("../database/wishlist/wishlistDatabase"));
const wishlistValidation_1 = require("../validation/wishlistValidation");
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req;
    const isUserExist = yield userDatabase_1.default.getUserName(userName);
    //@ts-ignore
    if (!isUserExist) {
        throw new serviceError_1.ServiceError(404, "User not found.");
    }
    const userWishlist = yield wishlistDatabase_1.default.get(userName);
    //@ts-ignore
    if (userWishlist.length === 0) {
        return "User wishlist empty.";
    }
    //@ts-ignore
    return userWishlist;
});
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistBody = (0, validation_1.validate)(wishlistValidation_1.POSTWishlistValidation, req);
    wishlistBody.wishlistId = prefix_1.default.WISHLIST + (0, getUuid_1.getUuid)();
    yield wishlistDatabase_1.default.insertOne(wishlistBody);
    return { isSucceed: true };
});
const deleteOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistBody = (0, validation_1.validate)(wishlistValidation_1.DELETEWishlistValidation, req);
    yield wishlistDatabase_1.default.deleteOne(wishlistBody);
    return { isSucceed: true };
});
exports.default = { get, insertOne, deleteOne };
