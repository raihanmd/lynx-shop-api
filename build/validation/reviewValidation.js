"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUTReviewValidation = exports.POSTReviewValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.POSTReviewValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
    reviewsRating: joi_1.default.number().max(5).required(),
    reviewsComment: joi_1.default.string().max(65535).required(),
    createdAt: joi_1.default.number().max(9999999999).required(),
});
exports.PUTReviewValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
    reviewsRating: joi_1.default.number().max(5).required(),
    reviewsComment: joi_1.default.string().max(65535).required(),
    updatedAt: joi_1.default.number().max(9999999999).required(),
});
