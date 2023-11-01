"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETEProductValidation = exports.PUTProductValidation = exports.POSTProductValidation = void 0;
//@ts-ignore
const joi_1 = __importDefault(require("joi"));
exports.POSTProductValidation = joi_1.default.object({
    productId: joi_1.default.string().max(14).optional(),
    productSlug: joi_1.default.string().max(100).optional(),
    createdAt: joi_1.default.number().max(9999999999).optional(),
    userId: joi_1.default.string().max(14).required(),
    productName: joi_1.default.string().max(255).required(),
    productPrice: joi_1.default.number().max(99999999999999999999).required(),
    productCategory: joi_1.default.string().max(14).required(),
    productDescription: joi_1.default.string().max(65535).required(),
    productQuantity: joi_1.default.number().max(9999999999).required(),
    productWeight: joi_1.default.number().max(9999999999).required(),
    productImage: joi_1.default.string().max(500).required(),
    blurhash: joi_1.default.string().max(100).required(),
});
exports.PUTProductValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
    productName: joi_1.default.string().max(255).required(),
    productPrice: joi_1.default.number().max(99999999999999999999).required(),
    productCategory: joi_1.default.string().max(14).required(),
    productDescription: joi_1.default.string().max(65535).required(),
    productQuantity: joi_1.default.number().max(9999999999).required(),
    productWeight: joi_1.default.number().max(9999999999).required(),
});
exports.DELETEProductValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
});
