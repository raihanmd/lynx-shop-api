"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETEWishlistValidation = exports.POSTWishlistValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.POSTWishlistValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
});
exports.DELETEWishlistValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
});
