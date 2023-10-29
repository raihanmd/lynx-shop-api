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
const userDatabase_1 = __importDefault(require("../database/user/userDatabase"));
const cartDatabase_1 = __importDefault(require("../database/cart/cartDatabase"));
const validation_1 = require("../utils/validation");
const serviceError_1 = require("../error/serviceError");
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
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const cartBody = (0, validation_1.validate)(cartValidation_1.POSTCartValidation, req);
    yield cartDatabase_1.default.insertOne(cartBody);
    return { isSucceed: true };
});
const update = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(cartValidation_1.PUTCartValidation, req);
    yield cartDatabase_1.default.updateOne(productBody);
    return { isSucceed: true };
});
const deleteOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = (0, validation_1.validate)(cartValidation_1.DELETECartValidation, req);
    yield cartDatabase_1.default.deleteOne(productBody);
    return { isSucceed: true };
});
exports.default = { get, insertOne, update, deleteOne };
