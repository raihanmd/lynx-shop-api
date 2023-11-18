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
const getUuid_1 = require("../utils/getUuid");
const reviewValidation_1 = require("../validation/reviewValidation");
const prefix_1 = __importDefault(require("../const/prefix"));
const reviewDatabase_1 = __importDefault(require("../database/review/reviewDatabase"));
const getUnixTime_1 = __importDefault(require("../utils/getUnixTime"));
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req;
    const productReview = yield reviewDatabase_1.default.get(productId);
    //@ts-ignore
    if (productReview.length === 0) {
        return "Product review empty.";
    }
    //@ts-ignore
    return productReview;
});
const insertOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewBody = (0, validation_1.validate)(reviewValidation_1.POSTReviewValidation, req);
    reviewBody.cartId = prefix_1.default.REVIEW + (0, getUuid_1.getUuid)();
    reviewBody.createdAt = (0, getUnixTime_1.default)();
    yield reviewDatabase_1.default.insertOne(reviewBody);
    return { isSucceed: true };
});
const updateOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewBody = (0, validation_1.validate)(reviewValidation_1.PUTReviewValidation, req);
    reviewBody.updatedAt = (0, getUnixTime_1.default)();
    yield reviewDatabase_1.default.updateOne(reviewBody);
    return { isSucceed: true };
});
exports.default = { get, insertOne, updateOne };
